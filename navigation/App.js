import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MyDrawer from './Drawer';
import AllSpecialty from '../screens/Home/AllSpecialty'
import AllClinic from '../screens/Home/AllClinic';
import AllDoctor from '../screens/Home/AllDoctor';
import DetailSpecialty from '../screens/Home/DetailSpecialty';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="Home"
                component={MyDrawer}
            />
            <Stack.Screen
                name="Specialty"
                component={AllSpecialty}
            />
            <Stack.Screen
                name="Clinic"
                component={AllClinic}
            />
            <Stack.Screen
                name="Doctor"
                component={AllDoctor}
            />
            <Stack.Screen 
                name="DetailSpecialty"
                component={DetailSpecialty}
            />
        </Stack.Navigator>
    )
}

export default AppNavigator