import { StatusBar } from 'expo-status-bar';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
         
    <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('SignIn')}
      >
        <Text style={styles.buttonText}>SignIn</Text>
      </Pressable>
    <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
    <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('Dashboard')}
      >
        <Text style={styles.buttonText}>Dashboard</Text>
      </Pressable>

      <Pressable
              style={styles.button}
              onPress={() => navigation.navigate('AddBooks')}
            >
              <Text style={styles.buttonText}>AddBooks</Text>
        </Pressable>

        <StatusBar style="auto" />
    </View>
  );
}

//şimdilik bunlar kafana göre değiştirebilirsin
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
});

export default HomeScreen;
