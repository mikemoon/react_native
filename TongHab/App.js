import React, { Component, useState, useRef, useEffect } from 'react';
import {
  Text,
  View,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity,
  Platform
} from 'react-native';
import TextItem from './components/TextItem';

  
import { useIntl } from "react-intl";
import { TouchableHighlight } from 'react-native-gesture-handler';
import { inject, observer } from 'mobx-react';
import MobXStore from './src/MobXStore.js';
import { observable } from 'mobx';

const App: () => Node = () => {
  return (
    <View style={styles.container}>
      <Text style={{marginLeft:5, textAlign:'center'}}>1ddd</Text>
      <TextItem text="Hello world from React Naitve Web" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;