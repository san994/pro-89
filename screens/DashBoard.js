import React,{Component}from 'react';
import { Text, View, StyleSheet } from 'react-native';

import DrawerScreen from "../navgation/DrawerNavigator"

import { NavigationContainer } from '@react-navigation/native';

export default function DashBoard() {
  return (
    <NavigationContainer>
     <DrawerScreen/>
    </NavigationContainer>
  
  );
}

