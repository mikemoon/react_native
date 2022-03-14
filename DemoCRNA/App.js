import "react-native-gesture-handler";

import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { useLoadedAssets } from "./hooks/useLoadedAssets";
import Navigation from "./navigation";
import React, {useState, useEffect} from 'react';
import { useColorScheme, Platform } from "react-native";

//언어변경
import "intl";
import "intl/locale-data/jsonp/en";
import 'intl/locale-data/jsonp/id';
import { IntlProvider } from "react-intl";
import languagesList from './src/strings/languagesList.js';

import { Observer, Provider, useObserver } from "mobx-react";

//구글로그인
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import { NavigationContainer, TabActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MobXStore from './src/utils/MobXStore';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const IOS_GOOGLE_CLIENT_ID = '382755949407-68i7mnl4avi2j2cms9u0l3pjt3drlld1.apps.googleusercontent.com';
const AOS_GOOGLE_CLIENT_ID = '382755949407-9cusqc1i86ou6859vqbn5bcanq843vth.apps.googleusercontent.com';

import SplashScreen from './src/screens/SplashScreen';
import PermissionScreen from './src/screens/PermissionScreen';
import LoginScreen from './src/screens/LoginScreen';

export default function App() {
  const isLoadingComplete = useLoadedAssets();
  const colorScheme = useColorScheme();

  const {localeStore} = MobXStore();

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
        webClientId: googleClientId, 
        androidClientId:AOS_GOOGLE_CLIENT_ID,
        iosClientId:IOS_GOOGLE_CLIENT_ID
      });
      console.log("socialGoogleConfigure")
    }
    socialGoogleConfigure();
    //구글 로그인 초기화 끝
  },[])

  
  return <Observer>{()=>
      <IntlProvider locale={localeStore.locale} messages={localeStore.message} defaultLocale="en">
        <Provider localeStore={localeStore}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Start" screenOptions={{headerShown: false}}>
            <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ title: '' }}/> 
            <Stack.Screen name="PermissionScreen" component={PermissionScreen} options={{ title: '' }}/>
            <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ title: '' }}/>
          </Stack.Navigator> 
        </NavigationContainer>
        </Provider>
      </IntlProvider>
    }</Observer>
}
