/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import "intl";
import { Platform } from "react-native";
import "intl/locale-data/jsonp/en";
import React from 'react';
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
const locale = "en";
const messages = { "en": enMsg, kr: krMsg}[locale];

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  
  return (
    <IntlProvider locale={locale} messages={messages}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Start" screenOptions={{headerShown: false}}>
          <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ title: '' }}/> 
          <Stack.Screen name="PermissionScreen" component={PermissionScreen} options={{ title: '' }}/>
        </Stack.Navigator>  
      </NavigationContainer> 
    </IntlProvider>
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
