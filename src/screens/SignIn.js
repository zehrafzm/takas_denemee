import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,TextInput, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useRef } from "react";
import app from '../FirebaseConfig';
import { getDatabase, ref, onValue, set, get} from "firebase/database";


export default function Signin() {
  const [mail, setMail] = useState();
  const [password, setPassword] = useState();
  const database = getDatabase(app); //firebase

  const handleSignIn = (mail, password) => {
    console.log('Mail:', mail);
    console.log('Password:', password);
  
    const usersRef = ref(database, 'users');
  
    get(usersRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          let currentUsers = snapshot.val();
          
          if (!Array.isArray(currentUsers)) {
            currentUsers = [currentUsers];
          }
            const newUser = {
            mail: mail,
            password: password,
            own:[],
            wish:[],
          };
          const updatedUsers = [...currentUsers, newUser]; 
          set(usersRef, updatedUsers)
            .then(() => {
              console.log('User data sent to Firebase');
            })
            .catch((error) => {
              console.error('Error sending user data to Firebase:', error);
            });
        } else {
          const newUser = {
            mail: mail,
            password: password,
            own:[],
            wish:[],
          };
          const updatedUsers = [newUser];
  
          // Update the 'users' node with the new user array
          set(usersRef, updatedUsers)
            .then(() => {
              console.log('User data sent to Firebase');
            })
            .catch((error) => {
              console.error('Error sending user data to Firebase:', error);
            });
        }
      })
      .catch((error) => {
        console.error('Error retrieving current users from Firebase:', error);
      });
  };
  

  

  return (
    <View style={styles.container}>
      <TextInput
        editable
        //multiline
        placeholder='mail'
        numberOfLines={1}
        maxLength={40}
        onChangeText={text => setMail(text)}
        value={mail}
        style={{padding: 10, backgroundColor:"whitesmoke",width:300}}
      />
      <TextInput
        editable
        //multiline
        placeholder='password'
        numberOfLines={1}
        maxLength={40}
        onChangeText={text => setPassword(text)}
        value={password}
        style={{padding: 10, backgroundColor:"whitesmoke",width:300}}
      />
      <View>
         <TouchableOpacity style={styles.button} onPress={()=>handleSignIn(mail,password)}>  
         <Text style={styles.buttonText} >Signin</Text></TouchableOpacity>          
      </View>
     
      <StatusBar style="auto" />
    </View>
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
});
