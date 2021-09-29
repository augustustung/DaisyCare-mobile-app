import React, { Component } from 'react'
import {
    Text,
    View,
    Image,
    FlatList
} from 'react-native'
import { connect } from "react-redux"
import { styles } from './SectionStyle'
import { getTopDoctorHomeService } from '../../../../services/userService'
import _ from 'lodash'
import { EmptyComponent } from '../../../../ultis'

class OutStandingDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            topDoctorHome: []
        }
    }

    async componentDidMount() {
        const res = await getTopDoctorHomeService(8)
        if (res && res.errCode === 0) {
            this.setState({ topDoctorHome: res.data })
        }
    }

    renderDoctor = (item) => {
        const doctorName = ` ${item.lastName} ${item.firstName}`
        let obj = item;
        delete obj.image
        console.log(check, obj);
        return (
            <View style={styles.sectionCard}>
                <Image
                    source={{
                        uri: item.image
                    }}
                    style={styles.avartar}
                />
                <Text style={styles.doctorName}>{doctorName}</Text>
                <Text style={styles.doctorMajor}>Cơ xương khớp</Text>
            </View>
        )
    }

    render() {
        const { topDoctorHome } = this.state
        return (
            <View style={styles.sectionContainer}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Bác sĩ nổi bật tuần qua</Text>
                    <Text style={styles.btnTitle}>Tìm kiếm</Text>
                </View>

                <View style={styles.sectionFooter}>
                    <FlatList
                        horizontal={true}
                        data={topDoctorHome}
                        keyExtractor={(obj) => Math.random()}
                        renderItem={({ item }) => this.renderDoctor(item)}
                        showsHorizontalScrollIndicator={false}
                        ListEmptyComponent={EmptyComponent("Hệ thống đang bảo trì")}
                    />
                </View>
            </View>
        )
    }
}


const mapStateToProps = () => ({
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor)