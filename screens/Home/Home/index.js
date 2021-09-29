import React, { useLayoutEffect } from 'react'
import {
    View,
    Image,
    ScrollView
} from 'react-native'
import { styles } from '../style.home'
import * as Animatable from 'react-native-animatable'
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { DrawerActions } from '@react-navigation/native'
import { connect } from "react-redux"
import Banner from './Sections/Banner'
import Specialty from './Sections/Specialty'
import Clinic from './Sections/Clinic'
import OutstandingDoctor from './Sections/OutstandingDoctor'
import { scaleV } from '../../../ultis'
import HomeFooter from './Sections/HomeFooter'
import Covid from './Sections/Covid'

function HomeScreen({
    navigation
}) {

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => <Image style={{ resizeMode: 'contain', height: "100%" }} source={require("../../../assets/logo.png")} />,
            headerLeft: () => (
                <View style={{ justifyContent: 'center', height: '100%' }}>
                    <FontAwesome
                        name="bars"
                        size={20}
                        style={styles.leading}
                        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                    />
                </View>
            ),
            headerTitleAlign: 'center',
            headerStyle: { height: scaleV(70) }
        })
    }, [])
    return (
        <Animatable.View
            style={styles.container}
            animation="fadeInUp"
            duration={1000}
        >
            <ScrollView showsVerticalScrollIndicator={false}>
                <Banner />
                <Specialty />
                <Clinic />
                <OutstandingDoctor />
                <Covid />
                <HomeFooter />
            </ScrollView>
        </Animatable.View>

    )
}

const mapStateToProps = (state) => ({
    userInfo: state.user.userInfo
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)