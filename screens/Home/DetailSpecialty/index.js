import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, Image, ImageBackground } from 'react-native'
import SafeContainer from '../../../components/SafeContainer'
import CustomHeader from '../../../components/CustomHeader'
import { headerLeft } from '../../../ultis'
import { getDetailSpecialty } from '../../../services'
import styles from './detailSpecialty'
import HTMLView from 'react-native-htmlview'

function DetailSpecialty({
  route,
  navigation
}) {
  const [routeName, setRouteName] = useState('Chi tiết chuyên khoa')
  const [dataSpecialty, setDataSpecialty] = useState({})
  
  async function fetchData() {
    let res = await getDetailSpecialty(route.params)
    if(res && res.errCode === 0) {
      Object.keys(res.data).map(key => {
        if(key !== 'image') {
          console.clear()
          console.log(key, res.data[key])
        }
      })
      setDataSpecialty(res.data)
    }
  }

  useEffect(() => {
    fetchData()
  },[])

  return (
    <SafeContainer>
        <CustomHeader headerLeft={() => headerLeft({ navigation: navigation, routeName: routeName })}/>
        <ImageBackground 
          source={{ uri: dataSpecialty.image || "" }}
          style={styles.imageBg}
        >
          <View style={styles.imageBgMask}>
            <HTMLView 
              value={dataSpecialty.descriptionHTML || null}
            />
          </View>
        </ImageBackground>
    </SafeContainer>
  )
}

export default DetailSpecialty