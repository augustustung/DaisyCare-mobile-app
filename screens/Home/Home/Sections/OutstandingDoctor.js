import React, { Component, useEffect, useState } from 'react'
import {
    Text,
    View,
    Image,
    FlatList,
    TouchableOpacity
} from 'react-native'
import { connect } from "react-redux"
import { styles } from './SectionStyle'
import _ from 'lodash'
import { EmptyComponent } from '../../../../ultis'
import ButtonTag from '../../../../components/ButtonTag'

function OutStandingDoctor({
    topDoctor,
    navigation
}) {
    const [topDoctorHome, setTopDoctorHome] = useState([])

    useEffect(() => {
        if (topDoctor && topDoctor.length > 0)
            setTopDoctorHome(topDoctor);
    },[topDoctor])

    const renderDoctor = (item) => {
        const doctorName = ` ${item.lastName} ${item.firstName}`
        return (
            <TouchableOpacity onPress={() => navigation.navigate('DetailDoctor', item.id)} style={styles.sectionCard}>
                <Image
                    source={{
                        uri: item.image
                    }}
                    style={styles.avartar}
                />
                <Text style={styles.doctorName}>{doctorName}</Text>
                <Text style={styles.doctorMajor}>Cơ xương khớp</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.sectionContainer}>
            <ButtonTag title="Bác sĩ nổi bật tuần qua" btnTitle="Tìm kiếm" OnPress={() => navigation.navigate("Doctor")}/>

            <View style={styles.sectionFooter}>
                <FlatList
                    horizontal={true}
                    data={topDoctorHome}
                    keyExtractor={(obj) => Math.random()}
                    renderItem={({ item }) => renderDoctor(item)}
                    showsHorizontalScrollIndicator={false}
                    ListEmptyComponent={EmptyComponent("Hệ thống đang bảo trì")}
                />
            </View>
        </View>
    )
}


const mapStateToProps = state => ({
    topDoctor: state.app.homeData.topDoctor
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor)