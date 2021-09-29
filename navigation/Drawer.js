import * as React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import {
  View,
  Image
} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather'
import Home from '../screens/Home/Home';
import Message from '../screens/Home/Message';
import { styles } from './style.drawer';
import { processLogout } from '../redux/actions'
import { useDispatch } from 'react-redux';

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
                label="Home"
                onPress={() => { props.navigation.navigate('Home') }}
              />
              <DrawerItem
                icon={({ color, size }) => (
                  <Feather
                    name="message-circle"
                    color={color}
                    size={size}
                  />
                )}
                label="Message"
                onPress={() => { props.navigation.navigate('Message') }}
              />
              <DrawerItem
                icon={({ color, size }) => (
                  <MaterialCommunityIcons
                    name="bookmark-outline"
                    color={color}
                    size={size}
                  />
                )}
                label="Bookmarks"
                onPress={() => { props.navigation.navigate('BookmarkScreen') }}
              />
              <DrawerItem
                icon={({ color, size }) => (
                  <Feather
                    name="settings"
                    color={color}
                    size={size}
                  />
                )}
                label="Settings"
                onPress={() => { props.navigation.navigate('SettingsScreen') }}
              />
              <DrawerItem
                icon={({ color, size }) => (
                  <MaterialCommunityIcons
                    name="account-check-outline"
                    color={color}
                    size={size}
                  />
                )}
                label="Support"
                onPress={() => { props.navigation.navigate('SupportScreen') }}
              />
            </View>
          </View>
        </View>
      </DrawerContentScrollView>

      <DrawerItem
        label="Sign out"
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
      <Drawer.Screen name="MessageScreen" component={Message} />
    </Drawer.Navigator>
  );
}

export default MyDrawer