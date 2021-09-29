import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MyDrawer from './Drawer';

const Tab = createBottomTabNavigator();

export default BottomTab = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="HomeScreen" component={MyDrawer} />
            {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
        </Tab.Navigator>
    )
}
