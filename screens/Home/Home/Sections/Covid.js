import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import SafeContainer from '../../../../components/SafeContainer'
import { scaleH, scaleV } from '../../../../ultis'
import axios from 'axios'
import moment from 'moment'

const Covid = () => {
  const [infoCOVID, setInfoCOVID] = useState(null)
  
  const fetchDataCOVID = async () => {
    await axios.get(`https://api.covid19api.com/dayone/country/vietnam`)
      .then((res) => {
        if (res && res.data.length > 0) {
          let data = res.data[res.data.length - 2]
          setInfoCOVID(data)
        }
      })
  }

  const getName = () => {
    return infoCOVID ?
      moment(new Date(infoCOVID.Date)).locale('vi').format("LLL") : '0'
  }

  useEffect(() => {
    fetchDataCOVID()
  },[])
  
  console.log(infoCOVID)

  return (
    <SafeContainer>
      <View style={styles.container}>
        <View>
          <Text>Việt Nam {"\n"}{getName()}</Text>
        </View>
        <View style={styles.sectionItems}>
          <View style={{flexDirection: 'row'}}>
            <View style={[styles.borderLeft, { backgroundColor: "red" }]} />
            <Text style={styles.content}>Tử vong</Text>
          </View>
          <Text style={styles.content}>{infoCOVID && infoCOVID.Deaths}</Text>
        </View>

        
        <View style={styles.sectionItems}>
          <View style={{flexDirection: 'row'}}>
            <View style={[styles.borderLeft, { backgroundColor: "yellow" }]} />
            <Text style={styles.content}>Nhiễm bệnh</Text>
          </View>
          <Text style={styles.content}>{infoCOVID && infoCOVID.Confirmed}</Text>
        </View>

        
        <View style={styles.sectionItems}>
          <View style={{flexDirection: 'row'}}>
            <View style={[styles.borderLeft, { backgroundColor: "green" }]} />
            <Text style={styles.content}>Hồi phục</Text>
          </View>
          <Text style={styles.content}>{infoCOVID && infoCOVID.Active}</Text>
        </View>
      </View>
    </SafeContainer>
  )
}

export default Covid

const styles = StyleSheet.create({
  container: {
    marginHorizontal: scaleH(16),
    marginTop: scaleV(24)
  },
  sectionItems: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: scaleV(12)
  },
  borderLeft: {
    width: 5,
    height: scaleV(30),
    marginRight: 8
  },
  content: {
    textAlign: 'right',
    fontSize: scaleH(19),
    lineHeight: scaleV(21.5),
    letterSpacing: 0.5,
    alignSelf: 'center'
  }
})
