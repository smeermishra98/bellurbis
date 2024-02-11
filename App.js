/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import {
  Alert,
  BackHandler,
  StyleSheet,
  Text,
} from 'react-native';
import store from './src/Helpers/Store';
import { Provider, connect } from 'react-redux';
import { persistStore } from "redux-persist"
import { PersistGate } from "redux-persist/integration/react"
import AppLevelSpinner from './src/Helpers/AppLevelSpinner';
import Navigator from './src/Helpers/Navigator';

let persistor = persistStore(store)
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading....</Text>} persistor={persistor}>
        <Navigator/>
        <AppLevelSpinner />
      </PersistGate>
    </Provider>
  )
}

const styles = StyleSheet.create({

});


export default App

