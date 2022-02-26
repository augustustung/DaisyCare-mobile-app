import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import SafeContainer from '../../../components/SafeContainer'
import CustomHeader from '../../../components/CustomHeader'
import { ColorConst, headerLeft, scaleH } from '../../../ultis'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllDoctor } from '../../../redux/actions'
import { styles } from '../style.home'
import { CustomDropDownPicker } from '../../../components/CustomDropDownPicker'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'

const AllDoctor = ({
    navigation
}) => {
    const [dataDoctor, setDataDoctor] = useState([])
    const dispatch = useDispatch()
    const { allDoctor } = useSelector(state => state.app)
    const [openDropdown, setOpenDropdown] = useState(false)
    const [selectedValue, setSelectedValue] = useState(null)
    const [items, setItems] = useState([])
    
    const buildDataPicker = (data) => {
        let arrData = []
        for(let i = 0; i < data.length; i++) {
            let obj = {
                label: `${data[i].lastName} ${data[i].firstName}`,
                value: data[i].id
            }
            arrData.push(obj)
        }
        setItems(arrData)
    }

    useEffect(() => {
        dispatch(fetchAllDoctor())
    },[])

    useEffect(() => {
        if(allDoctor && allDoctor.length > 0) {
            setDataDoctor(allDoctor)
            buildDataPicker(allDoctor)
        }
    },[allDoctor])

    const renderItem = ({ item }) => {
        const fullName = `${item.lastName} ${item.firstName}`
        return (
            <TouchableOpacity style={styles.sectionItem} onPress={() => navigation.navigate("DetailDoctor", item.id)}>
                <View>
                    <Image
                        source={{ uri: item?.image || "" }}
                        style={styles.sectionItemAvatar}
                    />
                    <View style={{flexDirection: 'row', marginTop:4}}>
                        <FontAwesome5Icon name="map-marker-alt" color={ColorConst.DEEP_GREEN} size={scaleH(16)} style={{marginRight: 8}}/>
                        <Text style={styles.subtitle}>{item.address}</Text>
                    </View>
                </View>
                <Text numberOfLines={3} style={styles.sectionItemTitle}>
                    {fullName}
                </Text>
            </TouchableOpacity>
        )
    }

    useEffect(() => {
        if(selectedValue) {
            navigation.navigate('DetailDoctor', selectedValue)
            setSelectedValue(null)
        }
    },[selectedValue])

    return (
        <SafeContainer>
            <CustomHeader headerLeft={() => headerLeft({ navigation: navigation, routeName: "Bác sĩ" })}/>
            <View style={styles.horizontal16}>
                <CustomDropDownPicker
                    open={openDropdown}
                    listItems={items}
                    selectedValue={selectedValue}
                    setOpen={setOpenDropdown}
                    setSelectedValue={setSelectedValue}
                    setItems={setItems}
                    placeholder="Tìm bác sĩ giỏi"
                />
            </View>
            <FlatList 
                data={dataDoctor}
                keyExtractor={obj => Math.random()}
                renderItem={renderItem}
            />
        </SafeContainer>
    )
}

export default AllDoctor
