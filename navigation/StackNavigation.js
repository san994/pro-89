import React, { Component } from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import BottomTabNavigator from "./TabNavigator"

import CreatePost from '../screens/CreatePost';

const Stack = createStackNavigator()
 
const StackScreen =()=>{
    return(
     <Stack.Navigator>
         <Stack.Screen name="Home" component={BottomTabNavigator}/>
         <Stack.Screen name="PostScreen" component={CreatePost}/>
     </Stack.Navigator>
    )
}

export default StackScreen