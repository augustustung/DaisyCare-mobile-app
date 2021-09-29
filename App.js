/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import { Provider } from 'react-redux'
import DaisyCare from './navigation';
import { store, persistor } from './store'
import Toast from 'react-native-toast-message';
import { PersistGate } from 'redux-persist/integration/react';
// import SplashScreen from 'react-native-splash-screen';

export default function App() {

  // useEffect(() => {
  //   SplashScreen.hide()
  // }, [])

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <DaisyCare />
        </PersistGate>
      </Provider>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </>
  );
}
