/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, {useState} from 'react';
import type {Node} from 'react';

import LoginScreen from './src/LoginScreen';
import MainScreen from './src/MainScreen';
import WebViewScreen from './src/WebViewScreen';
import FansingChartScreen from './src/FansingChartScreen';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  AppRegistry,
  TouchableHighlight,
  Alert,
} from 'react-native';

//import PagerView from 'react-native-pager-view';
//import Paging from 'react-native-infinite-swiper';
import Swiper from 'react-native-swiper'
import { IntlProvider } from "react-intl";
import krMsg from "./src/strings/kr.json";
import enMsg from "./src/strings/en.json";


import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { parse } from '@babel/core';

import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);

//import InfiniteViewPager from './InfiniteViewPager';
const locale = "en";
const messages = { "en": enMsg, kr: krMsg}[locale];

const Section = ({children, title , imgUrl}): Node => {

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
      <Image style={styles.imageType} source={{uri : imgUrl}}/>
    </View>
  );
};

const TestCon = (json) => {
  return (
    <View>
      <Text>test comp{json}</Text>
    </View>
  );
}

const Stack = createStackNavigator();

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <IntlProvider locale={locale} messages={messages}>
    <NavigationContainer> 
      <Stack.Navigator initialRouteName="LOGIN" screenOptions={{headerShown: false}}> 
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ title: '' }}/> 
        <Stack.Screen name="MainScreen" component={MainScreen} options={{ title: '' }}/> 
        <Stack.Screen name="WebViewScreen" component={WebViewScreen} options={{ title: '' }}/> 
        <Stack.Screen name="FansingChartScreen" component={FansingChartScreen} options={{ title: '팬싱차트' }}/> 
      </Stack.Navigator> 
    </NavigationContainer>
    </IntlProvider>
  );
  
};



const RViewPager = ({dataArr}) =>{
  
  return(
    <PagerView style={{ width : '100%', height : 200}} initialPage={0}>
      {
        dataArr.map((item, index) => ( 
          <View key={index}>
               <Image style={{width : '100%', 
    height : 200}} resizeMode='contain' source={{uri : item}}/> 
             </View> 
          ) 
        )

        
      }
    </PagerView>
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
  imageType : {
    width : '100%', 
    height : 180,
  },

  bannerContainer : {
    width : '100%', 
    height : 180,
  },

  viewPager: {
    width : '100%', height : 200,
  },

  slide1: {
    width : '100%', height : 180,
    justifyContent: 'center',
    alignItems: 'center',
  },
});





export default App;

AppRegistry.registerComponent('Sample', ()=> InfiniteViewPager);
