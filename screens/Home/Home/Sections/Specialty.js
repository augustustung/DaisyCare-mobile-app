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

class Specialty extends Component {
    constructor(props) {
        super(props)
    }

    renderItem = (item) => (
        <View style={styles.sectionCard}>
            <Image
                source={{ uri: item.images }}
                style={styles.cardImg}
            />
            <Text numberOfLines={1} style={styles.cardTitle}>{item.title}</Text>
        </View>
    )

    render() {
        return (
            <View style={styles.sectionContainer}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Chuyên khoa phổ biến</Text>
                    <Text style={styles.btnTitle}>Xem thêm</Text>
                </View>

                <View style={styles.sectionFooter}>
                    <FlatList
                        data={news}
                        horizontal={true}
                        keyExtractor={(obj) => Math.random()}
                        renderItem={({ item }) => this.renderItem(item)}
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
        title: "asdasdadasdsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssasda",
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


const mapStateToProps = () => {
    return {
    };
};

const mapDispatchToProps = dispatch => ({

});



export default connect(mapStateToProps, mapDispatchToProps)(Specialty)