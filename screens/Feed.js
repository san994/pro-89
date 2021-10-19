import React, { Component } from 'react';
import { Text, View, FlatList, SafeAreaView, StyleSheet, Image,Platform,StatusBar} from 'react-native';

import {RFValue} from 'react-native-responsive-fontsize'

import StoryCard from "./StoryCard"

import firebase from "firebase";

let posts = require('./temp_post.json')

export default class Feed extends Component {

  constructor(){
    super()
    this.state={
      light_Theme:true,
      stories:[]
    }
   
  }

  componentDidMount(){
    this.fetchUser()
    this.fetchPost()
  }

  fetchUser=()=>{
   let theme
   firebase.database()
   .ref("/users/"+firebase.auth().currentUser.uid)
   .on("value",(data)=>{
     theme = data.val().current_theme
     this.setState({light_Theme: theme === "light"})
   })
  }

    keyExtractor = (item, index) => index.toString();

    renderItem=({item:post})=>{
        return <StoryCard post={post} navigation={this.props.navigation}/>
    }

    fetchPost=()=>{
      firebase
      .database()
      .ref("/post/")
      .on(
         "value",
         snapshot=>{
          let stories=[]
          if(snapshot.val()){
            Object.keys(snapshot.val()).onEach(key=>{
              stories.push({
                key:key,
                value:snapshot.val()[key]
              })
            })
            this.setState({stories:stories})
          }
         },
         function(error){
           console.log("this read is failed: "+error.message)
         } 
      )
    }

    render() {
        return (
            <View style={this.state.light_Theme?styles.containerLight:styles.container}>
              <SafeAreaView style={styles.droidSafeArea}/>
              <View style={styles.appTitle}>
                <View style={styles.appIcon}>
                  <Image source={require('../assets/logo.png')}  style={styles.appIcon}></Image>
                </View>
                <View style={styles.appTitleTextContainer}>
                   <Text style={this.state.light_Theme?styles.appTitleTextLight:styles.appTitleText}>Spectagram</Text>
                </View>
              </View>
              {!this.state.stories[0]?(
                 <View style={styles.noStories}>
                 <Text
                   style={
                     this.state.light_theme
                       ? styles.noStoriesTextLight
                       : styles.noStoriesText
                   }
                 >
                   No Stories Available
                 </Text>
               </View>
              ):(
                <View style={styles.cardContainer}>
                  <FlatList
                   keyExtractor={this.keyExtractor}
                   data={this.states.stories}
                   renderItem={this.renderItem}
                  />
              </View>
              )}
            </View>
        )
    }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#15193c"
  },
  containerLight: {
    flex: 1,
    backgroundColor: "white"
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
  },
  appTitle: {
    flex: 0.07,
    flexDirection: "row"
  },
  appIcon: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center"
  },
  iconImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain"
  },
  appTitleTextContainer: {
    flex: 0.7,
    justifyContent: "center"
  },
  appTitleText: {
    color: "white",
    fontSize: RFValue(28),
    fontFamily: "Bubblegum-Sans"
  },
  appTitleTextLight: {
    color: "black",
    fontSize: RFValue(28),
    fontFamily: "Bubblegum-Sans"
  },
  cardContainer: {
    flex: 0.85
  },

});
