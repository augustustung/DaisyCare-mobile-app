import React, { Component } from 'react'
import {
    Text,
    TouchableOpacity,
    View,
    Image,
    FlatList
} from 'react-native'
import { connect } from "react-redux"
import { EmptyComponent } from '../../../../ultis'
import { styles } from './SectionStyle'


class Clinic extends Component {
    constructor(props) {
        super(props)
    }

    renderClinic = (item) => (
        <View style={styles.sectionCard}>
            <Image
                source={{ uri: item.images }}
                style={styles.cardImg}
            />
            <Text style={styles.cardTitle}>{item.title}</Text>
        </View>
    )

    render() {
        return (
            <View style={styles.sectionContainer}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Cơ sở y tế nổi bật</Text>


                    <TouchableOpacity style={styles.sectionButton}>
                        <Text style={styles.btnTitle}>Xem thêm</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.sectionFooter}>
                    <FlatList
                        data={news}
                        horizontal={true}
                        keyExtractor={(obj) => Math.random()}
                        renderItem={({ item }) => this.renderClinic(item)}
                        style={{ backgroundColor: '#eee' }}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        ListEmptyComponent={EmptyComponent("Hệ thống đang bảo trì")}
                    />
                </View>
            </View>
        )
    }
}


const news = [
    {
        id: 1,
        title: "asdasdadasdasda",
        subtitle: "sadasdasdadasdasfnfgn",
        images: 'https://placeimg.com/500/300'
    },
    {
        id: 2,
        title: "asdasadasdasda",
        subtitle: "sadasdasdadasdasfnfgn",
        images: 'https://placeimg.com/500/300'
    },
    {
        id: 3,
        title: "asdasdasdasda",
        subtitle: "sadasdasdadasdasfnfgn",
        images: 'https://placeimg.com/500/300'
    }
]

const mapStateToProps = () => ({

});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Clinic)