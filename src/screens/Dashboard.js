import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,TextInput, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useRef } from "react";
import { useAuth } from '../AuthContext';
import { useNavigation } from '@react-navigation/native';
import { signOut, getAuth } from 'firebase/auth';
import { database } from '../FirebaseConfig';
import { ref, onValue } from 'firebase/database';



export default function Dashboard() {
    const { user } = useAuth();
    const navigation = useNavigation();
    const auth = getAuth();
    const[currUser,setCurrUser] = useState(null);
    const handleSignOut = () => {
      signOut(auth);
        navigation.navigate("HomeScreen");
    };


    useEffect(() => {
      const usersRef = ref(database, 'users');

      onValue(usersRef, (snapshot) => {
          const usersData = snapshot.val(); // Get the data from the snapshot
          if (usersData) {
              Object.values(usersData).forEach((userDb) => {
                  if (userDb.id === user.uid) {
                      setCurrUser(userDb);
                  }
              });
          }
      });

      // Cleanup the listener when the component unmounts
      return () => {
          off(usersRef); // Assuming off is a function to detach the listener
      };
  }, []);
    
    
  return (
    <View style={styles.container}>
      <View>
      <Text>Dashboard</Text>
      <Text> {currUser?.uni || "user not logged in"}</Text>
      <Text> {currUser?.userName || "user not logged in"}</Text>
      <Text> {currUser?.mail || "user not logged in"}</Text>
      <Text> {currUser?.password || "user not logged in"}</Text>
      </View>
      <TouchableOpacity style={styles.button}  onPress={handleSignOut}><Text>sign out</Text></TouchableOpacity>
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
    backgroundColor: 'whitesmoke',
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
