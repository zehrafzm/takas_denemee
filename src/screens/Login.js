import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,TextInput, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useRef } from "react";
import {app,auth} from '../FirebaseConfig';
import { getDatabase, ref, onValue, set, get} from "firebase/database";
import Dashboard from './Dashboard';
import { useNavigation } from '@react-navigation/native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useAuth } from '../AuthContext';

export default function Login() {
  const [mail, setMail] = useState();
  const [password, setPassword] = useState();
  const database = getDatabase(app); //firebase
  const navigation = useNavigation();

  //const handlePress= ()=>{navigation.navigate('Dashboard')}
  

  const { setUser } = useAuth();

  function userEnter() {
    if (!mail || !password) {
      console.log('Email and password are required.');
      return;
    }

    signInWithEmailAndPassword(auth, mail, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setUser(user);
        navigation.navigate('Dashboard'); // Navigate to Dashboard on successful login
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error signing in:", errorCode, errorMessage);
      });
  }
  
  
  

  

  return (
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
      <View>
         <TouchableOpacity style={styles.button} onPress={userEnter}>  
         <Text style={styles.buttonText}  >Login</Text></TouchableOpacity>          
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
