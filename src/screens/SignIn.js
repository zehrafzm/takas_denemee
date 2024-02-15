import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,TextInput, TouchableOpacity,FlatList, Image, ScrollView,useWindowDimensions } from 'react-native';
import React, { useState, useEffect, useRef } from "react";
import {app,auth} from '../FirebaseConfig';
import { getDatabase, ref, onValue, set, get} from "firebase/database";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import odtuLogo from "../assets/odtu.png"
import bilkentLogo from "../assets/bilkent.png"


export default function Signin() {
  const scrollViewRef = useRef(null); //bunlar aşağı kaydırmak için
  const [scrollPositionY, setScrollPositionY] = useState(0);
  const handleScrollY = (event) => {
    setScrollPositionY(event.nativeEvent.contentOffset.y);
  };
  const { width: windowWidth, height: windowHeight } = useWindowDimensions(); //css te kullanırırz


  const [mail, setMail] = useState();
  const [password, setPassword] = useState();
  const [userName, setUserName] = useState();
  const [uni, setUni] = useState();

  const images=[
    {id:"ODTU", source: odtuLogo},
    {id:"BILKENT", source: bilkentLogo},
  ]
  
  const database = getDatabase(app); 
  
  const navigation = useNavigation();

  const handleSignIn = (mail, password,userName) => {  
    createUserWithEmailAndPassword(auth, mail, password,userName)
      .then((userCredential) => {
        const user = userCredential.user;  
        const usersRef = ref(database, 'users');
        get(usersRef)
          .then((snapshot) => {
            let currentUsers = snapshot.exists() ? Object.values(snapshot.val()) : [];
            const newUser = {
              id: user.uid,
              uni:uni,
              mail: mail,
              password:password,
              userName: userName,
              own: [],
              wish: [],
            };
            const updatedUsers = [...currentUsers, newUser];
            const updatedUsersObject = updatedUsers.reduce((acc, user) => {
              acc[user.id] = user;
              return acc;
            }, {});
  
            set(usersRef, updatedUsersObject)
              .then(() => {
              })
              .catch((error) => {
              });
          })
          .catch((error) => {
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
      navigation.navigate("HomeScreen");
  };
  

  

  return (
 <ScrollView
  ref={scrollViewRef}
        vertical = {true}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        scrollEventThrottle={20}
        onScroll={handleScrollY}>
     <View style={styles.container}>
      <TextInput
        editable
        placeholder='mail'
        numberOfLines={1}
        maxLength={40}
        onChangeText={text => setMail(text)}
        value={mail}
        style={{padding: 10, backgroundColor:"whitesmoke",width:300}}
      />
      <TextInput
        editable
        placeholder='password'
        numberOfLines={1}
        maxLength={40}
        onChangeText={text => setPassword(text)}
        value={password}
        style={{padding: 10, backgroundColor:"whitesmoke",width:300}}
      />
      <TextInput
        editable
        placeholder='userName'
        numberOfLines={1}
        maxLength={40}
        onChangeText={text => setUserName(text)}
        value={userName}
        style={{padding: 10, backgroundColor:"whitesmoke",width:300}}
      />
      <FlatList
      data={images}
      renderItem={({ item }) => (
        <TouchableOpacity  onPress={() => setUni(item.id)}>
          <Image source={item.source} style={styles.logo} />
        </TouchableOpacity>
      )}
      keyExtractor={item => item.id}
      horizontal
    />




      <View>
         <TouchableOpacity style={styles.button} onPress={()=>handleSignIn(mail,password,userName,uni)}>  
         <Text style={styles.buttonText} >Sign in</Text></TouchableOpacity>          
      </View>
     
      <StatusBar style="auto" />
    </View>
 </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button:{
    marginTop: 5,
    backgroundColor: 'green',
    padding: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logo:{
    margin:10,
    height:50,
    width:50
  },
  scrollViewContent: {
    flexGrow: 1,
  },
});
