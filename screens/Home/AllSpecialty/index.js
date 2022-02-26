import React, { useEffect, useState } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import SafeContainer from '../../../components/SafeContainer'
import CustomHeader from '../../../components/CustomHeader'
import { headerLeft } from '../../../ultis'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllSpecialty } from '../../../redux/actions'
import { FlatList } from 'react-native-gesture-handler'
import { styles } from '../style.home'
import { CustomDropDownPicker } from '../../../components/CustomDropDownPicker'

const AllSpecialty = ({
    navigation
}) => {
    const [dataSpecialty, setDataSpecialty] = useState([])
    const [openDropdown, setOpenDropdown] = useState(false)
    const [selectedValue, setSelectedValue] = useState(null)
    const [items, setItems] = useState([])
    const dispatch = useDispatch()
    const { allSpecialty } = useSelector(state => state.app)

    const buildDataPicker = (data) => {
        let arrData = []
        for(let i = 0; i < data.length; i++) {
            let obj = {
                label: data[i].nameVi,
                value: data[i].id
            }
            arrData.push(obj)
        }
        setItems(arrData)
    }

    useEffect(() => {
        dispatch(fetchAllSpecialty())
    },[])

    useEffect(() => {
        if(allSpecialty && allSpecialty.length > 0) {
            setDataSpecialty(allSpecialty)
            buildDataPicker(allSpecialty)
        }
    },[allSpecialty])

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate("DetailSpecialty", item.id)} style={styles.sectionItem}>
                <Image
                    source={{ uri: item?.image || "" }}
                    style={styles.sectionItemImage}
                />
                <Text style={styles.sectionItemTitle}>
                    {item.nameVi}
                </Text>
            </TouchableOpacity>
        )
    }

    useEffect(() => {
        if(selectedValue) {
            navigation.navigate('DetailSpecialty', selectedValue)
            setSelectedValue(null)
        }
    },[selectedValue])

    return (
        <SafeContainer>
            <CustomHeader headerLeft={() => headerLeft({ navigation: navigation, routeName: "Chuyên khoa" })}/>
            <View style={styles.horizontal16}>
                <CustomDropDownPicker 
                    open={openDropdown}
                    listItems={items}
                    selectedValue={selectedValue}
                    setOpen={setOpenDropdown}
                    setSelectedValue={setSelectedValue}
                    setItems={setItems}
                    placeholder="Tìm chuyên khoa"
                />
            </View>
            <FlatList 
                data={dataSpecialty}
                keyExtractor={() => Math.random()}
                renderItem={renderItem}
            />
        </SafeContainer>
    )
}

export default AllSpecialty
