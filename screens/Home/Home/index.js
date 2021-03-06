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
import * as actions from '../../../redux/actions'
import ProgressLoader from 'rn-progress-loader';

function HomeScreen({
    navigation,
    fetchHomeData,
    isLoading
}) {

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => <Image style={{ width: 100, height: "100%", resizeMode: 'center' }} source={require("../../../assets/logoSmall.png")} />,
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
        fetchHomeData()
    }, [fetchHomeData])

    if (isLoading) {
			return (
				<ProgressLoader
				visible={isLoading}
				isModal={true} isHUD={true}
				hudColor={"#000000"}
				color={"#FFFFFF"} />
			)
    }

    return (
        <Animatable.View
            style={styles.container}
            animation="fadeInUp"
            duration={1000}
        >
            <ScrollView showsVerticalScrollIndicator={false}>
                <Banner />
                <Specialty navigation={navigation} />
                <Clinic navigation={navigation} />
                <OutstandingDoctor navigation={navigation} />
                <Covid navigation={navigation} />
                <HomeFooter />
            </ScrollView>
        </Animatable.View>

    )
}

const mapStateToProps = (state) => ({
    userInfo: state.user.userInfo,
    isLoading: state.app.isLoading
});

const mapDispatchToProps = dispatch => ({
    fetchHomeData: () => dispatch(actions.fetchHomeData())
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)