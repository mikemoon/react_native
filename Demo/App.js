/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import "intl";
import "intl/locale-data/jsonp/en";
import 'intl/locale-data/jsonp/id';


import { Platform } from "react-native";

import React, {useState} from 'react';
import type {Node} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { IntlProvider } from "react-intl";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import krMsg from "./src/strings/kr.json";
import enMsg from "./src/strings/en.json";

import SplashScreen from './src/SplashScreen';
import PermissionScreen from './src/PermissionScreen';
import LoginScreen from './src/LoginScreen';
import MobXStore from './src/MobXStore';
import { Provider } from "mobx-react";


const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const Stack = createStackNavigator();
let locale = "en";
const messages = { "en": enMsg, ko: krMsg}[locale];
//https://npm.io/package/react-intl-auto-translator

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [lang, setLang] = useState(locale);
  const [messageLang, setMessageLang] = useState(messages);

  const storage = require('./src/utils/Storage.js');

  console.log("App  lang messages  = "+JSON.stringify(messages));
  const changeToLanguage = (langCode) => {
    console.log("changeToLanguage  langCode = "+langCode);
    setLang(langCode);
  }


  storage.getStorage("lang").then(result =>{
    console.log("storage get lang = "+result);
    if(result != null){
      setMessageLang({ "en": enMsg, ko: krMsg}[result]);
      setLang(result);
    }
  })
  
  return (
    <Provider mobxStore={MobXStore}>
    <IntlProvider locale={lang} messages={messageLang} defaultLocale="en">
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Start" screenOptions={{headerShown: false}}>
          <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ title: '' }}/> 
          <Stack.Screen name="PermissionScreen" component={PermissionScreen} options={{ title: '' }}/>
          <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ title: '' }}/>
        </Stack.Navigator>  
      </NavigationContainer> 
    </IntlProvider>
    </Provider>
  );
};

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
