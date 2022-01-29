import React, { useEffect, useState } from 'react';
import { getProfileDoctorById } from '../services/index'
import NumberFormat from 'react-number-format';
import _ from 'lodash';
import IonIcon from 'react-native-vector-icons/Ionicons'
import moment from 'moment';
import {
  TouchableOpacity, View, Text, StyleSheet, Image
} from 'react-native';
import { ColorConst } from '../ultis/Constant'
import HTMLView from 'react-native-htmlview';

function ProfileDoctor({
  doctorId, isShowDoctorDescription,
  dataTime, isShowLink, isShowPrice,
  navigation
}) {
  const [dataProfile, setDatProfile] = useState({})

  useEffect(() => {
    async function getDetailDoctorInfo() {
      let doctorInfo = await getInfoDoctor(doctorId)
      if (doctorInfo) {
        setDatProfile(doctorInfo)
      }
    }
    getDetailDoctorInfo()
  }, [])


  const getInfoDoctor = async (id) => {
    let result = {}
    if (id) {
      let res = await getProfileDoctorById(id)
      if (res && res.errCode === 0) {
        result = res.data
      }
    }

    return result
  }

  const getProvinceName = () => {
    let name = ''
    if (dataProfile && dataProfile.Doctor_Info && dataProfile.Doctor_Info.provinceData) {
      let data = dataProfile.Doctor_Info.provinceData
      name = data.valueVi
    }

    return name
  }

  const renderTimeBooking = (dataTime) => {
    if (dataTime && !_.isEmpty(dataTime)) {
      let time = dataTime.timeTypeData.valueVi
      let date = moment.unix(+dataTime.date / 1000).format("dddd - DD/MM/YYYY")
      return (
        <View>
          <View><Text>{time} - {date}</Text></View>
          <View>
            <Text>Miễn phí đặt lịch</Text>
          </View>
        </View>
      )
    }

    return <View />
  }
  let name = dataProfile?.lastName + " " + dataProfile?.firstName || ""
  let priceVi = dataProfile?.Doctor_Info?.priceData?.valueVi || ""

  return (
    <View>
      <View style={styles.introDoctor}>
        <Image
          source={{ uri: dataProfile.image ? dataProfile.image : "" }}
          style={styles.contentLeft}
        />

        <View style={styles.contentRight}>
          <View style={styles.up}>
            <Text>
              {name}
            </Text>
          </View>

          <View style={styles.down}>
            {
              isShowDoctorDescription ? (
                <HTMLView
                  value={dataProfile?.Markdown?.description || "<p></p>"}
                />
              ) : renderTimeBooking(dataTime)
            }
          </View>
        </View>
      </View>

      <View style={styles.pfBtnViewMore}>
        <View style={styles.detailDoctorLocation}>
          <IonIcon name="location-outline" size={20} color={ColorConst.DEEP_GREEN} />
          <Text>{getProvinceName()}</Text>
        </View>
        {isShowLink && (
          <TouchableOpacity onPress={() => navigation.navigate("DetailDoctor", doctorId)}>
            <Text>Xem thêm</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.line} />


      {isShowPrice && (
        <View className="price">
          Giá khám: {"  "}
          <NumberFormat
            value={priceVi}
            displayType='text'
            thousandSeparator={true}
            suffix={'vnđ'}
            style={{ color: "#333" }}
          />
        </View>
      )}
    </View>
  );

}

export default ProfileDoctor

const styles = StyleSheet.create({
  introDoctor: {
    display: "flex",
    flexDirection: 'row',
    paddingBottom: 12
  },
  contentLeft: {
    maxWidth: '20%',
    height: 60,
    width: 60,
    borderRadius: 50,
  },
  contentRight: {
    width: "80%",
    flexDirection: "column",
    paddingLeft: 10,
    display: "flex",
    justifyContent: 'center'
  },
  up: {
    fontSize: 20,
    fontWeight: "600"
  },
  down: {
    paddingTop: 10
  },
  detailDoctorLocation: {
    display: 'flex',
    flexDirection: "row"
  },
  pfBtnViewMore: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingBottom: 16
  },
  line: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    width: "100%",
    marginBottom: 15
  }
})