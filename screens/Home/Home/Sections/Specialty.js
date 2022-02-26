import React from 'react'
import {
    Text,
    View,
    Image,
    FlatList,
    TouchableOpacity
} from 'react-native'
import { connect } from "react-redux"
import { EmptyComponent } from '../../../../ultis'
import { styles } from './SectionStyle'
import ButtonTag from '../../../../components/ButtonTag'

function Specialty({
    topSpecialty: dataSpecialty,
    navigation
}) {

    const renderItem = (item) => (
        <TouchableOpacity onPress={() => navigation.navigate("DetailSpecialty", item.id)} style={styles.sectionCard}>
            <Image
                source={{ uri: item?.image || "" }}
                style={styles.cardImg}
            />
            <Text numberOfLines={1} style={styles.cardTitle}>{item.nameVi}</Text>
        </TouchableOpacity>
    )

    return (
        <View style={styles.sectionContainer}>
            <ButtonTag title="Chuyên khoa phổ biến" btnTitle="Xem thêm" OnPress={() => navigation.navigate("Specialty")}/>

            <View style={styles.sectionFooter}>
                <FlatList
                    data={dataSpecialty}
                    horizontal={true}
                    keyExtractor={(obj) => Math.random()}
                    renderItem={({ item }) => renderItem(item)}
                    showsHorizontalScrollIndicator={false}
                    ListEmptyComponent={EmptyComponent("Hệ thống đang bảo trì")}
                />
            </View>
        </View>
    )
}


const mapStateToProps = (state) => ({
    topSpecialty: state.app.homeData.topSpecialty
});

export default connect(mapStateToProps, null)(Specialty)