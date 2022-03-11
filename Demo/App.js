/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

//언어변경
import "intl";
import "intl/locale-data/jsonp/en";
import 'intl/locale-data/jsonp/id';
import { IntlProvider } from "react-intl";

import languaguesList from './src/strings/languaguesList.js';

//구글로그인
import { GoogleSignin } from '@react-native-community/google-signin';

import React, {useState, useEffect} from 'react';
import type {Node} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Platform
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';


import { NavigationContainer, TabActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SplashScreen from './src/SplashScreen';
import PermissionScreen from './src/PermissionScreen';
import LoginScreen from './src/LoginScreen';
import MobXStore from './src/MobXStore';
import { Provider, useObserver } from "mobx-react";


import MainScreen from "./src/MainScreen";
import ChatScreen from "./src/ChatScreen";


const Stack = createStackNavigator();
//https://npm.io/package/react-intl-auto-translator
const Tab = createBottomTabNavigator();
const IOS_GOOGLE_CLIENT_ID = '382755949407-68i7mnl4avi2j2cms9u0l3pjt3drlld1.apps.googleusercontent.com';
const AOS_GOOGLE_CLIENT_ID = '382755949407-9cusqc1i86ou6859vqbn5bcanq843vth.apps.googleusercontent.com';

const App: () => Node = () => {
  
  const {localeStore} = MobXStore();

  const isDarkMode = useColorScheme() === 'dark';

  const storage = require('./src/utils/Storage.js');  

  storage.getStorage("lang").then(result =>{
    console.log("storage get lang = "+result);
    if(result != null){
      localeStore.setLocale(result)
    }
  })

  useEffect(()=>{
    //구글 로그인 초기화 시작
    let googleClientId = AOS_GOOGLE_CLIENT_ID;
    if(Platform.OS === 'ios'){
      googleClientId = IOS_GOOGLE_CLIENT_ID;
    }
    const socialGoogleConfigure = async()=>{
      await GoogleSignin.configure({
        webClientId: googleClientId
      });
      console.log("socialGoogleConfigure")
    }
    socialGoogleConfigure();
    //구글 로그인 초기화 끝
  },[])

  
  return useObserver(()=>(
    <IntlProvider locale={localeStore.locale} messages={localeStore.message} defaultLocale="en">
      <Provider localeStore={localeStore}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Start" screenOptions={{headerShown: false}}>
          <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ title: '' }}/> 
          <Stack.Screen name="PermissionScreen" component={PermissionScreen} options={{ title: '' }}/>
          <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ title: '' }}/>
          <Stack.Screen name="Main" component={BottomNav} options={{ title: '' }}/>
        </Stack.Navigator> 
      </NavigationContainer> 
      </Provider>
    </IntlProvider>
    
  ));
};

const BottomNav = ()=>{
  return (
    <Tab.Navigator>
            <Tab.Screen name="MainScreen" component={MainScreen} />
            <Tab.Screen name="ChatScreen" component={ChatScreen} />
          </Tab.Navigator> 
  )
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
