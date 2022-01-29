import React, { useState, useEffect } from 'react';
import { getDetailClinicById } from '../../../../services/userService'
import _ from 'lodash'
import ProfileDoctor from '../Doctor/ProfileDoctor'
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfo from '../Doctor/DoctorExtraInfo';
import styles from './detailClinic.style'
import SafeContainer from '../../../components/SafeContainer';
import { ScrollView, View, Text } from 'react-native';
import CustomHeader from '../../../components/CustomHeader';

function DetailClinic({
  route,
  navigation
}) {
  const [dataDetailClinic, setDataDetailClinic] = useState({})
  const [arrDoctorId, setArrDoctorId] = useState([])

  async function fetchData() {
    let clinicId = route.params

    let res = await getDetailClinicById(clinicId)

    if (res && res.errCode === 0) {
      let arrId = []
      let data = res.data
      if (data && !_.isEmpty(data)) {
        let arr = data.doctorClinic;
        if (arr && arr.length > 0) {
          arr.map(item => {
            arrId.push(item.doctorId)
            return item
          })
        }
      }
      setDataDetailClinic(res.data)
      setArrDoctorId(arrId)
    }
  }

  useEffect(() => {
    fetchData()
  }, []);

  return (
    <SafeContainer noPadding>
      <ScrollView>
        <CustomHeader headerLeft={() => headerLeft({ navigation: navigation, routeName: 'Chi tiết phòng khám' })} />
        <View style={styles.detailSpecialtyContainer}>
          <View style={styles.detailSpecialtyBody}>
            {/* {
              arrDoctorId && arrDoctorId.length > 0 ? arrDoctorId.map((item, index) => {
                return (
                  <View className="each-doctor" key={index}>

                    <View className="dt-content-left">
                      <ProfileDoctor
                        doctorId={item}
                        isShowDoctorDescription={true}
                        isShowLink={true}
                        isShowPrice={false}
                      // dataTime={dataSchedule}
                      />
                    </View>

                    <View className="dt-content-right">
                      <View className="doctor-schedule">
                        <DoctorSchedule doctorIdFromParent={item} />
                      </View>

                      <View className="doctor-extra-info">
                        <DoctorExtraInfo doctorIdFromParent={item} />
                      </View>
                    </View>
                  </View>

                )
              }) : (
                <View className="ds-none">
                  <FormattedMessage id="manage-doctor.none" />
                </View>
              )
            } */}

            {/* <View className="detail-specialty-description">
              {
                dataDetailClinic && !_.isEmpty(dataDetailClinic) && (
                  <View
                    dangerouslySetInnerHTML={{
                      __html: dataDetailClinic.descriptionHTML
                    }}
                  />
                )
              }
            </View> */}
          </View>
        </View>
      </ScrollView>
    </SafeContainer>
  );
}

export default DetailClinic;