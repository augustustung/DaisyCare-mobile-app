import React, { useState, useEffect } from 'react';
import { getDetailClinic } from '../../../services'
import _ from 'lodash'
import ProfileDoctor from '../../../components/ProfileDoctor'
import DoctorSchedule from '../../../components/DoctorSchedule'
import DoctorExtraInfo from '../../../components/DoctorExtraInfo'
import styles from './detailClinic.style'
import SafeContainer from '../../../components/SafeContainer';
import { ScrollView, View, Text, FlatList } from 'react-native';
import CustomHeader from '../../../components/CustomHeader';
import { EmptyComponent, headerLeft } from '../../../ultis';
import HTMLView from 'react-native-htmlview';

function DetailClinic({
  route,
  navigation
}) {
  const [dataDetailClinic, setDataDetailClinic] = useState({})
  const [arrDoctorId, setArrDoctorId] = useState([])

  async function fetchData() {
    let clinicId = route.params

    let res = await getDetailClinic(clinicId)
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
          <FlatList
            keyExtractor={() => Math.random()}
            data={arrDoctorId || []}
            renderItem={({ item }) =>
              <View style={styles.eachDoctor}>
                <ProfileDoctor
                  doctorId={item}
                  key={Math.random()}
                  isShowDoctorDescription={true}
                  isShowLink={true}
                  isShowPrice={false}
                  navigation={navigation}
                />
                <View style={styles.dtContentRight}>
                  <View>
                    <DoctorSchedule doctorIdFromParent={item || 0} navigation={navigation} />
                  </View>

                  <View style={styles.doctorExtraInfo}>
                    <DoctorExtraInfo doctorIdFromParent={item || 0} navigation={navigation} />
                  </View>
                </View>
              </View>
            }
            ListEmptyComponent={EmptyComponent("Không có bác sĩ trong bệnh viện này")}
          />

          <View style={styles.detailSpecialtyDescription}>
            {
              dataDetailClinic && !_.isEmpty(dataDetailClinic) && (
                <HTMLView
                  value={dataDetailClinic?.descriptionHTML || "<p></p>"}
                />
              )
            }
          </View>
        </View>
      </ScrollView>
    </SafeContainer>
  );
}

export default DetailClinic;