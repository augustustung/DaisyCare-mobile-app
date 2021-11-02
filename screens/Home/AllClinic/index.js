import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, Image } from 'react-native'
import SafeContainer from '../../../components/SafeContainer'
import CustomHeader from '../../../components/CustomHeader'
import { headerLeft } from '../../../ultis'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllClinic } from '../../../redux/actions'
import { styles } from '../style.home'
import { CustomDropDownPicker } from '../../../components/CustomDropDownPicker'

const AllClinic = ({
    navigation
}) => {
    const [dataClinic, setDataClinic] = useState([])
    const dispatch = useDispatch()
    const { allClinic } = useSelector(state => state.app)
    const [openDropdown, setOpenDropdown] = useState(false)
    const [selectedValue, setSelectedValue] = useState(null)
    const [items, setItems] = useState([])

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
        dispatch(fetchAllClinic())
    },[])

    useEffect(() => {
        if(allClinic && allClinic.length > 0) {
            setDataClinic(allClinic)
            buildDataPicker(allClinic)
        }
    },[allClinic])

    const renderItem = ({ item }) => {
        return (
            <View style={styles.sectionItem}>
                <Image
                    source={{ uri: item.image }}
                    style={styles.sectionItemImage}
                />
                <Text numberOfLines={3} style={styles.sectionItemTitle}>
                    {item.nameVi}
                </Text>
            </View>
        )
    }

    useEffect(() => {
        if(selectedValue) {
            navigation.navigate('DetailClinic', selectedValue)
            setSelectedValue(null)
        }
    },[selectedValue])
    
    return (
        <SafeContainer>
            <CustomHeader headerLeft={() => headerLeft({ navigation: navigation, routeName: "Bệnh viện" })}/>
            <View style={styles.horizontal16}>
                <CustomDropDownPicker
                    open={openDropdown}
                    listItems={items}
                    selectedValue={selectedValue}
                    setOpen={setOpenDropdown}
                    setSelectedValue={setSelectedValue}
                    setItems={setItems}
                    placeholder="Tìm chuyên bệnh viện"
                />
            </View>
            <FlatList 
                data={dataClinic}
                keyExtractor={obj => Math.random()}
                renderItem={renderItem}
            />
        </SafeContainer>
    )
}

export default AllClinic
