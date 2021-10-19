import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import firebase from "firebase";

export default class LoadingScreen extends Component {
    
componentDidMount(){
    this.checkIfLogIn()
}

checkIfLogIn=()=>{
 firebase.auth().onAuthStateChanged(user=>{
  if(user){
      this.props.navigation.navigate("DashBoard")
  }else{
      this.props.navigation.navigate("LoginScreen")
  }
 })
}

render() {
    return (
        <View>
        <Text>Loading</Text>
        </View>
    );
}
}
    
