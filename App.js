import React from 'react';
import { StatusBar } from 'expo-status-bar';
import Navigation from './src/screens/Navigation';
import * as ScreenOrientation from 'expo-screen-orientation';
import { AuthProvider } from './src/AuthContext';
import Dashboard from './src/screens/Dashboard';

export default function App() {
  //ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE); //yatay ya da portreye ayarlayalım css i rahat ayarlamak için bncc

  return (
    <AuthProvider> 
      <Navigation />
      <StatusBar style="auto" />
    </AuthProvider>
  );
}
