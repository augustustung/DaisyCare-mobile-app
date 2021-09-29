import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MyDrawer from './Drawer';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="Home"
                component={MyDrawer}
            />
        </Stack.Navigator>
    )
}

export default AppNavigator