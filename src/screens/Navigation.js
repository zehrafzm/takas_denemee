import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Login';
import HomeScreen from '../HomeScreen';
import Signin from './SignIn';
import Dashboard from './Dashboard';

function Navigation() {
    const Stack = createStackNavigator();

  return (
    <NavigationContainer >
 <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: 'white',
            height:50 // Set the background color of the header
            //borderBottomWidth: 2, // Set a custom thickness for the header border
          },
          headerTintColor: 'black', // Set the text color of the header
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize:10
          },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignIn" component={Signin} /> 
        <Stack.Screen name="Dashboard" component={Dashboard} /> 
        <Stack.Screen name="HomeScreen" component={HomeScreen} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
{/**name olan sayfa adı, diğeri fonksiyonun adı san */}