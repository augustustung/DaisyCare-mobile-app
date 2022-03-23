import * as React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import {
  View, Alert
} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather'
import Home from '../screens/Home/Home';
// import Message from '../screens/Home/Message';
import { styles } from './style.drawer';
import { processLogout } from '../redux/actions'
import { useDispatch } from 'react-redux';
import BookingSchedule from '../screens/BookingSchedule';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {

  const dispatch = useDispatch()

  const signOut = () => {

    dispatch(processLogout())
  }

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.drawerContent}>
            <View style={styles.userInfoSection}>
              <View style={{ flexDirection: 'row', marginTop: 15 }}>
                <View style={{ marginLeft: 15, flexDirection: 'column', justifyContent: 'space-evenly' }}>
                  {/* <Text style={styles.title}>{user.name}</Text> */}
                  {/* <Text>{user.gender}</Text> */}
                </View>
              </View>
            </View>

            <View style={styles.drawerSection}>
              <DrawerItem
                icon={({ color, size }) => (
                  <MaterialCommunityIcons
                    name="home-outline"
                    color={color}
                    size={size}
                  />
                )}
                label="Trang chủ"
                onPress={() => props.navigation.navigate('HomeScreen')}
              />
              <DrawerItem
                icon={({ color, size }) => (
                  <Feather
                    name="message-circle"
                    color={color}
                    size={size}
                  />
                )}
                label="Tin nhắn"
                onPress={() => Alert.alert("Daisy Care", "Tính năng đang phát triển") /*props.navigation.navigate('MessageScreen')*/}
              />
              <DrawerItem
                icon={({ color, size }) => (
                  <MaterialCommunityIcons
                    name="bookmark-outline"
                    color={color}
                    size={size}
                  />
                )}
                label="Lịch đặt"
                onPress={() => props.navigation.navigate('BookmarkScreen')}
              />
              <DrawerItem
                icon={({ color, size }) => (
                  <Feather
                    name="settings"
                    color={color}
                    size={size}
                  />
                )}
                label="Cài đặt"
                onPress={() => Alert.alert("Daisy Care", "Tính năng đang phát triển") /*props.navigation.navigate('SettingsScreen')*/}
              />
            </View>
          </View>
        </View>
      </DrawerContentScrollView>

      <DrawerItem
        label="Đăng xuất"
        onPress={signOut}
        icon={({ size, color }) =>
          <MaterialCommunityIcons
            size={size}
            color={color}
            name="exit-to-app"
          />}
      />
    </View>
  );
}


function MyDrawer() {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="HomeScreen" component={Home} />
      <Drawer.Screen name="BookmarkScreen" component={BookingSchedule} />
    </Drawer.Navigator>
  );
}

export default MyDrawer