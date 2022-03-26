import { View, Text, TouchableOpacity, FlatList, Alert } from 'react-native'
import React, { useEffect } from 'react'
import SafeContainer from '../../components/SafeContainer'
import { useLayoutEffect } from 'react'
import { getAllScheduled, userCancelSchedule } from '../../services'
import { useSelector } from 'react-redux'
import styles from './bookingSchedule.styles'
import { useState } from 'react'
import { EmptyComponent } from '../../ultis/CommonUltis'
const STATUS_DATA = {
  "S1": "CHƯA XÁC NHẬN",
  "S2": "ĐANG CHỜ KHÁM",
  "S3": "KHÁM THÀNH CÔNG"
}

export default function BookingSchedule({ navigation }) {
  const userInfo = useSelector((state) => state.user.userInfo)
  const [dataSchedule, setDataSchedule] = useState([])

  async function fetchData() {
    const res = await getAllScheduled(userInfo.id)
    if (res && res.length > 0) {
      setDataSchedule(res)
    } else {
      dataSchedule.length > 0 && setDataSchedule([])
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Lịch khám",
      headerRight: () => <TouchableOpacity style={{ paddingRight: 16 }} onPress={fetchData}><Text>Tải lại</Text></TouchableOpacity>
    })
  }, [])

  useEffect(() => {
    fetchData()
  }, [])

  async function handleCancelSchedule(scheduleId) {
    const res = await userCancelSchedule(scheduleId)
    if (res && res === 'OK') {
      Alert.alert("Daisy Care", "Huỷ lịch thành công")
      fetchData()
    } else {
      Alert.alert("Daisy Care", "Có lỗi xảy ra, vui lòng thử lại sau!")
    }
  }

  function renderStatus(id) {
    let result = ''
    Object.keys(STATUS_DATA).forEach((k) => {
      if (k === id) {
        result = STATUS_DATA[k]
      }
    })

    return result
  }

  return (
    <SafeContainer>
      <FlatList
        style={styles.scheduleContainer}
        data={dataSchedule}
        keyExtractor={() => Math.random()}
        ListEmptyComponent={EmptyComponent("Bạn chưa có lịch nào")}
        renderItem={({ item }) => {
          const doctorName = item?.doctor?.lastName + " " + item?.doctor?.firstName
          return (
            <View style={styles.scheduleItem}>
              <Text style={styles.text}>Bác sĩ: {doctorName}</Text>
              <Text style={styles.text}>Thời gian: {item?.timeData?.valueVi || ""}</Text>
              <Text style={styles.text}>Lý do: {item?.reason || ""}</Text>
              <Text style={styles.text}>Trạng thái: {renderStatus(item?.statusId)}</Text>
              {
                item.statusId === "S1" && (
                  <TouchableOpacity
                    onPress={() => handleCancelSchedule(item.id)}
                    style={styles.cancelBtn}
                  >
                    <Text style={styles.cancelBtnText}>HUỶ</Text>
                  </TouchableOpacity>
                )
              }
            </View>
          )
        }}
      />
    </SafeContainer>
  )
}