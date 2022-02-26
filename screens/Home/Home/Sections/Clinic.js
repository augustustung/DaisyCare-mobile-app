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
import SafeContainer from '../../../../components/SafeContainer'

function Clinic({
    navigation,
    topClinics: dataClinic
}) {

    const renderClinic = (item) => (
        <TouchableOpacity onPress={() => navigation.navigate('DetailClinic', item.id)} style={styles.sectionCard}>
            <Image
                source={{ uri: item?.image || "" }}
                style={styles.cardImg}
            />
            <Text style={styles.cardTitle}>{item.nameVi}</Text>
        </TouchableOpacity>
    )

    return (
        <SafeContainer>
            <View style={styles.sectionContainer}>
                <ButtonTag title="Cơ sở y tế nổi bật" btnTitle="Xem thêm" OnPress={() => navigation.navigate('Clinic')} />

                <View style={styles.sectionFooter}>
                    <FlatList
                        data={dataClinic}
                        horizontal={true}
                        keyExtractor={() => Math.random()}
                        renderItem={({ item }) => renderClinic(item)}
                        style={{ backgroundColor: '#eee' }}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        ListEmptyComponent={EmptyComponent("Hệ thống đang bảo trì")}
                    />
                </View>
            </View>
        </SafeContainer>
    )
}

const mapStateToProps = (state) => ({
    topClinics: state.app.homeData.topClinic
});

export default connect(mapStateToProps, null)(Clinic)