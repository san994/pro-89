import React, { Component } from 'react';
import { Text, View } from 'react-native';

import {NavigationContainer} from "@react-navigation/native"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Ionicons from "react-native-vector-icons/Ionicons"

import Feed from '../screens/Feed';
import CreatePost from '../screens/CreatePost';

const Tab = createBottomTabNavigator()
 
const BottomTabNavigator =()=>{
    return(
     <Tab.Navigator
      screenOptions={({route})=>({
        tabBarIcon:({focused,color,size})=>{
            let IconName
            if(route.name==="Feed"){
                IconName = focused?"book":"book-outline"
            }else if(route.name==="CreatePost"){
                IconName = focused?'create':'create-outline'
            }
            return <Ionicons name={IconName}  size={size} color={color}/>
        }
      })}

      tabBarOptions={{
          activeTintColor:"tomato",
          inactiveTintColor:"grey"
      }}
     >
      <Tab.Screen name="Feed" component={Feed} options={{unmountOnBlur:true}}/>
      <Tab.Screen name="CreatePost" component={CreatePost} options={{unmountOnBlur:true}}/>
     </Tab.Navigator>
    
    )
}

export default BottomTabNavigator