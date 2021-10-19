import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList, Image, SafeAreaView,Platform,StatusBar,ScrollView} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import {RFValue} from 'react-native-responsive-fontsize'
import Ionicons from "react-native-vector-icons/Ionicons";

export default class StoryCard extends Component{

  likeAction=()=>{
    if(is_liked){
      firebase
      .database()
      .ref("posts")
      .child(this.state.story_id)
      .child("likes")
      .set(firebase.database.ServerValue.increment(1));
      this.setState({like:(this.state.like-=1),is_liked:false})
    }else{
      firebase
      .database()
      .ref("posts")
      .child(this.state.story_id)
      .child("likes")
      .set(firebase.database.ServerValue.increment(-1));
      this.setState({like:(this.state.like+=1),is_liked:true})
    }
  }

    render(){
    if (!this.props.route.params) {
        this.props.navigation.navigate("Home");
      } else {
        return (
          <View style={styles.container}>
            <SafeAreaView style={styles.droidSafeArea} />
            <View style={styles.appTitle}>
              <View style={styles.appIcon}>
                <Image
                  source={require("../assets/icon.png")}
                  style={styles.iconImage}
                ></Image>
              </View>
              <View style={styles.appTitleTextContainer}>
                <Text style={styles.appTitleText}>Storytelling App</Text>
              </View>
            </View>
            <View style={styles.storyContainer}>
              <ScrollView style={styles.storyCard}>
                <Image
                  source={require("../assets/post.jpg")}
                  style={styles.image}
                ></Image>
  
                <View style={styles.dataContainer}>
                  <View style={styles.titleTextContainer}>
                    <Text style={styles.storyAuthorText}>
                      {this.props.route.params.post.author}
                    </Text>
                    <Text style={styles.storyAuthorText}>
                      {this.props.route.params.post.caption}
                    </Text>
                  </View>
                </View>
                <View style={styles.actionContainer}>
                  <TouchableOpacity>
                    <Ionicons name={"heart"} size={RFValue(30)} color={"white"} />
                    <Text style={this.state.light_theme
                        ? styles.likeTextLight
                        : styles.likeText}>12k</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </View>
        );
      }
    }
}
  
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#15193c"
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
    storyContainer: {
      flex: 1
    },
    storyCard: {
      margin: RFValue(20),
      backgroundColor: "#2f345d",
      borderRadius: RFValue(20)
    },
    image: {
      width: "100%",
      alignSelf: "center",
      height: RFValue(200),
      borderTopLeftRadius: RFValue(20),
      borderTopRightRadius: RFValue(20),
      resizeMode: "contain"
    },
    dataContainer: {
      flexDirection: "row",
      padding: RFValue(20)
    },
    titleTextContainer: {
      flex: 0.8
    },
    storyTitleText: {
      fontFamily: "Bubblegum-Sans",
      fontSize: RFValue(25),
      color: "white"
    },
    storyAuthorText: {
      fontFamily: "Bubblegum-Sans",
      fontSize: RFValue(18),
      color: "white"
    },
    iconContainer: {
      flex: 0.2
    },
    storyTextContainer: {
      padding: RFValue(20)
    },
    storyText: {
      fontFamily: "Bubblegum-Sans",
      fontSize: RFValue(15),
      color: "white"
    },
    moralText: {
      fontFamily: "Bubblegum-Sans",
      fontSize: RFValue(20),
      color: "white"
    },
    actionContainer: {
      justifyContent: "center",
      alignItems: "center",
      margin: RFValue(10)
    },
    likeButton: {
      width: RFValue(160),
      height: RFValue(40),
      flexDirection: "row",
      backgroundColor: "#eb3948",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: RFValue(30)
    },
    likeText: {
      color: "white",
      fontFamily: "Bubblegum-Sans",
      fontSize: RFValue(25),
      marginLeft: RFValue(5)
    },
    likeTextLight: {
      fontFamily: "Bubblegum-Sans",
      fontSize: RFValue(25),
      marginLeft: RFValue(5)
    }
  });