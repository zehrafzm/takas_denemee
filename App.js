import React from 'react';
import { StatusBar } from 'expo-status-bar';
import Navigation from './src/screens/Navigation';
import * as ScreenOrientation from 'expo-screen-orientation';


export default function App() {
  //ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE); //yatay ya da portreye ayarlayalım css i rahat ayarlamak için bncc

  return (
    <>
      <Navigation />
      <StatusBar style="auto" />
    </>
  );
}
