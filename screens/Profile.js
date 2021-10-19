import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  Switch,
  NativeEventEmitter
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";

import firebase from "firebase";

export default class Profile extends Component{

  constructor(){
      super()
      this.state={
          name:"",
          Image:""
      }
  }

  componentDidMount(){
    this.fetchUser()
  }

  fetchUser=async()=>{
      let name,profile_image
      await firebase.database()
      .ref("/users/"+firebase.auth().currentUser.uid)
      .on("value",(data)=>{
          name=`${data.val().first_name} ${data.val().last_name}`
          profile_image=data.val().profile_picture
      })
      this.setState({
          name:name,
          Image:profile_image
      })
  }

  render(){
    return (
      <View>
        <Text style={{justifyContent:"center"}}>{this.state.name}</Text>
      </View>
    );
  }
}