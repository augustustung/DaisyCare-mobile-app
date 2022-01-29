import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, Image, ImageBackground, Button, TouchableOpacity, ScrollView } from 'react-native'
import SafeContainer from '../../../components/SafeContainer'
import CustomHeader from '../../../components/CustomHeader'
import { EmptyComponent, headerLeft } from '../../../ultis'
import { getAllCodeService, getDetailSpecialty } from '../../../services'
import styles from './detailSpecialty'
import HTMLView from 'react-native-htmlview'
import ProfileDoctor from '../../../components/ProfileDoctor'
import { CustomDropDownPicker } from '../../../components/CustomDropDownPicker'

function DetailSpecialty({
  route,
  navigation
}) {
  const [dataSpecialty, setDataSpecialty] = useState(null)
  const [isViewDetail, setIsViewDetail] = useState(false)
  const [listProvince, setListProvince] = useState([])
  const [selectedProvince, setSelectedProvince] = useState(null)
  const [openDropdown, setOpenDropdown] = useState(false)

  async function fetchData() {
    let res = await getDetailSpecialty(route.params)
    let resProvince = await getAllCodeService("PROVINCE")

    if (res && res.errCode === 0 && resProvince && resProvince.errCode === 0) {
      setDataSpecialty(res.data)
      setListProvince(buildInputDataSelectDoctor(resProvince.data))
    }
  }

  const buildInputDataSelectDoctor = (data) => {
    let result = [];
    if (data && data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        let obj = {}
        obj.label = `${data[`${i}`].valueVi}`
        obj.value = data[`${i}`].keyMap

        result.push(obj)
      }
      result.push({
        label: "Toàn quốc",
        value: "ALL"
      })
    }
    return result;
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (selectedProvince) {
      getDetailSpecialty(route.params, selectedProvince)
        .then(res => {
          if (res && res.data) {
            setDataSpecialty(res.data)
          }
        })
    }
  }, [selectedProvince])

  if (!dataSpecialty) {
    return <View />
  }

  return (
    <SafeContainer noPadding>
      <ScrollView>
        <CustomHeader headerLeft={() => headerLeft({ navigation: navigation, routeName: 'Chi tiết chuyên khoa' })} />
        <ImageBackground
          source={{ uri: dataSpecialty.image || "" }}
          style={styles.imageBg}
        >
          <View style={styles.imageBgMask}>
            <View
              style={{
                height: isViewDetail ? "auto" : "20%",
                overflow: 'hidden'
              }}
            >
              <HTMLView
                value={dataSpecialty.descriptionHTML || null}
              />
            </View>
            <TouchableOpacity style={{ paddingBottom: 16 }} onPress={() => setIsViewDetail(!isViewDetail)}>
              <Text>
                {
                  isViewDetail ? "Ẩn bớt" : "Xem chi tiết"
                }
              </Text>
            </TouchableOpacity>
            <View style={styles.line} />
            <CustomDropDownPicker
              placeholder="Tỉnh/thành: "
              open={openDropdown}
              selectedValue={selectedProvince}
              listItems={listProvince}
              setOpen={setOpenDropdown}
              setSelectedValue={setSelectedProvince}
              setItems={setListProvince}
            />
            <FlatList
              keyExtractor={() => Math.random()}
              data={dataSpecialty?.doctorSpecialty || []}
              renderItem={({ item }) =>
                <ProfileDoctor
                  doctorId={item.doctorId}
                  key={Math.random()}
                  isShowDoctorDescription={true}
                  isShowLink={true}
                  isShowPrice={false}
                  navigation={navigation}
                />
              }
              ListEmptyComponent={EmptyComponent("Không có bác sĩ trong khu vực này")}
            />
          </View>
        </ImageBackground>
      </ScrollView>
    </SafeContainer>
  )
}

export default DetailSpecialty