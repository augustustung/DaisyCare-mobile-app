import { NavigationContainer } from "@react-navigation/native"
import AuthNavigator from "./Auth"
import React, { useEffect } from 'react'
import AppNavigator from "./App"
import { useSelector } from "react-redux"
import { LogBox } from "react-native"


function DaisyCare() {
    const { userInfo } = useSelector(state => state.user)

    useEffect(() => {
        LogBox.ignoreLogs(["If you want to use Reanimated 2 then go through our installation steps https://docs.swmansion.com/react-native-reanimated/docs/installation"])
    }, [])

    return (
        <NavigationContainer>
            {!userInfo ? <AuthNavigator /> : <AppNavigator />}
        </NavigationContainer>
    )
}


export default DaisyCare
