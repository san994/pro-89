import React, { Component } from 'react';
import { 
  Text, 
  View, 
  ScrollView, 
  StyleSheet,
  Platform, 
  StatusBar, 
  SafeAreaView, 
  Button,
  TextInput, 
  Image
} from 'react-native';

import DropDownPicker from "react-native-dropdown-picker";

import {RFValue} from 'react-native-responsive-fontsize';

import firebase from "firebase"

export default class CreatePost extends Component {
    constructor(){
        super()
        this.state={
            preview_Image:'image_1',
            dropdownHeight:40,
            light_Theme:false
        }
    }

    componentDidMount(){
      this.fetchUser()
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

    addPost=async()=>{
      if(this.state.caption){
        let postData = {
          image:this.state.preview_Image,
          caption:this.state.caption,
          auther:firebase.auth().currentUser.displayName,
          auther_uid:firebase.auth().currentUser.uid,
          like:0
        }
        await firebase
        .database()
        .ref(
          "/post/"+
          Math.random()
              .toString(36)
              .slice(2)
        )
        .set(postData)
        .then((snapshot)=>{})
        this.props.navigation.navigate("Feed")
      }else{
        alert(
          "Error",
          "all fields required",
          [{text:"Ok",onPress:()=>console.log("ok")}],
          {cancelled:false}
        )
      }
    }
    render() {
        let previewImage ={
            'image_1':"../assets/image_1.jpg",
            'image_2':"../assets/image_2.jpg",
            'image_3':"../assets/image_3.jpg",
            'image_4':"../assets/image_4.jpg",
            'image_5':"../assets/image_5.jpg",
            'image_6':"../assets/image_6.jpg",
            'image_7':"../assets/image_7.jpg",
        }
        return (
          <View style={this.state.light_Theme?styles.containerLight:styles.container}>
            <SafeAreaView style={styles.droidSafeArea}/>
             <View style={styles.appTitle}>
             <View style={styles.appIcon}>
                <Image source={require('../assets/logo.png')} style={styles.iconImage}></Image>
              </View>
              <View>
                   <Text >Spectagram</Text>
              </View>
            </View>
            <View>
             <ScrollView>
                 <Image source={previewImage[this.state.preview_Image]}></Image>
                 <View>
                     <DropDownPicker
                      item={[
                          {label:'image 1',value:'image_1'},
                          {label:'image 2',value:'image_2'},
                          {label:'image 3',value:'image_3'},
                          {label:'image 4',value:'image_4'},
                          {label:'image 5',value:'image_5'},
                          {label:'image 6',value:'image_6'},
                          {label:'image 7',value:'image_7'},
                      ]}
 
                       defaultValue={this.state.preview_Image}

                       containerStyle={{
                          height: 40,
                          borderRadius: 20,
                          marginBottom: 10
                        }}
      
                        onOpen={() => {
                          this.setState({ dropdownHeight: 170 });
                        }}
      
                        onClose={() => {
                          this.setState({ dropdownHeight: 40 });
                        }}
      
                        style={{ backgroundColor: "transparent" }}
                        
                        itemStyle={{
                          justifyContent: "flex-start"
                        }}
      
                        dropDownStyle={{ backgroundColor: "#2f345d" }}
      
                        labelStyle={{
                          color: "white",
                         
                        }}
      
                        arrowStyle={{
                          color: "white",
                       
                        }}
      
                        onChangeItem={item =>
                          this.setState({
                            preview_Image: item.value
                          })
                        }
                      
                     />
                 </View>

                 <TextInput
                  onChangetext={caption=> this.setState({ caption })}
                  placeholder={'caption'}
                  numberofLine={4}
                  multiLine={true}
                 />
                 <View>
                   <Botton
                    onPress={()=>this.addPost()}
                    title="submitt"
                   />
                 </View>
             </ScrollView>
            </View>
            <View style={{flex:0.08}}/>
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
    cardContainer: {
      flex: 0.85
    }
  })