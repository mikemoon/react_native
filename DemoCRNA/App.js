import "react-native-gesture-handler";

import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { useLoadedAssets } from "./hooks/useLoadedAssets";
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
//import { GoogleSignin } from '@react-native-google-signin/google-signin';

import { NavigationContainer, TabActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import  AsyncStorage  from '@react-native-async-storage/async-storage'

import MobXStore from './src/utils/MobXStore';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

import {STORAGE, DEV} from './src/constants/Values'

import SplashScreen from './src/screens/SplashScreen';
import PermissionScreen from './src/screens/PermissionScreen';
import LoginScreen from './src/screens/LoginScreen';
import MainScreen from "./src/screens/MainScreen";
import ChatScreen from "./src/screens/ChatScreen";

import {GOOGLE_LOGIN} from './src/constants/Values'

export default function App() {
  const isLoadingComplete = useLoadedAssets();
  const colorScheme = useColorScheme();

  const {localeStore} = MobXStore();

  const getLang = (async()=>{
    await AsyncStorage.getItem(STORAGE.key_lang).then(result =>{
      console.log("storage get lang = "+result);
      if(result != null){
        localeStore.setLocale(result)
      }
    }
  )
  })
  getLang()

  if(DEV) {
    import('./src/utils/ReactotronConfig').then(() => console.log('Reactotron Configured'))
  }

  useEffect(()=>{
    if(Platform.OS == "android" || Platform.OS == "ios"){

      let GoogleSignin = null;
      import('@react-native-google-signin/google-signin').then((module) => {
        GoogleSignin = module.GoogleSignin;

        //구글 로그인 초기화 시작
      const socialGoogleConfigure = async()=>{
        console.log("##socialGoogleConfigure "+JSON.stringify(GoogleSignin))
        await GoogleSignin.configure({
          //webClientId: GOOGLE_LOGIN.CLIENT_ID_WEB, 
          androidClientId:GOOGLE_LOGIN.CLIENT_ID_AOS,
          iosClientId:GOOGLE_LOGIN.CLIENT_ID_IOS
        });
        console.log("socialGoogleConfigure")
      }
      socialGoogleConfigure();
    });

      
    }
    
    //구글 로그인 초기화 끝
  },[])

  const BottomNav = ()=>{
    return (
      <Tab.Navigator>
              <Tab.Screen name="MainScreen" component={MainScreen} />
              <Tab.Screen name="ChatScreen" component={ChatScreen} />
            </Tab.Navigator> 
    )
  }

  
  return <Observer>{()=>
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
    }</Observer>
}
