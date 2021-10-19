import * as React from 'react';

import{StyleSheet} from "react-native"

import {createSwitchNavigator,createAppContainer} from "react-navigation"

import DrawerScreen from "./navigation/DrawerTab"
import { NavigationContainer } from '@react-navigation/native';

import LoginScreen from "./screens/LoadingScreen"
import LoadingScreen from "./screens/LoginScreen"
import DashboardScreen from "./screens/DashBoard"

import firebase from "firebase"
import { firebaseConfig } from './config';

const SwitchNavigator = createSwitchNavigator({
  LoadingScreen :LoadingScreen,
  LoginScreen : LoginScreen,
  DashboardScreen : DashboardScreen,
})

const AppContainer = createAppContainer(SwitchNavigator)

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig)
}else{
  firebase.app()
}

export default function App() {
  return(
    <AppContainer/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
