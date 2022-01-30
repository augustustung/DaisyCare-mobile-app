import React, { useState, useEffect } from 'react';
import { getDetailInfoDoctor } from '../../../services'
import DoctorSchedule from '../../../components/DoctorSchedule'
import DoctorExtraInfo from '../../../components/DoctorExtraInfo'
import { Image, ScrollView, Text, View } from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons'
import { ColorConst, headerLeft } from '../../../ultis';
import HTMLView from 'react-native-htmlview';
import styles from './DetailDoctor.style'
import SafeAreaContainer from '../../../components/SafeContainer'
import CustomHeader from '../../../components/CustomHeader';

function DetailDoctor({
  navigation,
  route
}) {
  const [detailDoctor, setDetailDoctor] = useState({})

  useEffect(() => {
    async function fetchData() {
      const doctorId = route.params
      let res = await getDetailInfoDoctor(doctorId)
      if (res && res.errCode === 0) {
        setDetailDoctor(res.data)
      }
    }

    fetchData()
  }, []);

  const getProvinceName = () => {
    let name = ''
    if (detailDoctor && detailDoctor.Doctor_Info && detailDoctor.Doctor_Info.provinceData) {
      let data = detailDoctor.Doctor_Info.provinceData
      name = data.valueVi
    }

    return name
  }

  return (
    <SafeAreaContainer>
      <ScrollView>
        <CustomHeader headerLeft={() => headerLeft({ navigation: navigation, routeName: 'Chi tiết bác sĩ' })} />
        <View style={styles.doctorDetailContainer}>
          <View style={styles.introDoctor}>
            <Image
              style={styles.contentLeft}
              source={{ uri: detailDoctor?.image || "" }}
            />
            <View style={styles.contentRight}>
              <IonIcon name="location-outline" size={20} color={ColorConst.DEEP_GREEN} />
              <Text style={{ paddingLeft: 10 }}>
                {getProvinceName()}
              </Text>
            </View>
          </View>
          <View style={styles.detailDoctor}>
            <Text style={styles.up}>{`${detailDoctor?.positionData?.valueVi || ""} ${detailDoctor?.lastName || ""} ${detailDoctor?.firstName || ""}`}</Text>

            <View style={styles.down}>
              {
                (detailDoctor.Markdown && detailDoctor.Markdown.description) &&
                <Text>
                  {detailDoctor?.Markdown?.description || ""}
                </Text>
              }
            </View>

          </View>

          <View>
            <View>
              <DoctorSchedule doctorIdFromParent={route.params} navigation={navigation} />
            </View>

            <View>
              <DoctorExtraInfo doctorIdFromParent={route.params} navigation={navigation} />
            </View>
          </View>

          <View style={styles.moreInfo}>
            {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.contentHTML && (
              <HTMLView
                value={detailDoctor?.Markdown?.contentHTML || "<p></p>"}
              />
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaContainer>
  );

}

export default DetailDoctor