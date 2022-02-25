import { useNavigation } from '@react-navigation/native';
import React, { Component, useEffect, useState } from 'react'; 
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, SafeAreaView,
    ScrollView, TouchableHighlight, Image, useColorScheme, Alert} from 'react-native';
    import Swiper from 'react-native-swiper'
    import {
        Colors,
        DebugInstructions,
        Header,
        LearnMoreLinks,
        ReloadInstructions,
      } from 'react-native/Libraries/NewAppScreen';

  const BoardType = ({boardDataArr, onItemSelected}) => {
    console.log('BoardType data = '+JSON.stringify(boardDataArr))  
    const [boardType, setBoardType] = useState(1);
    if(boardDataArr == null){
      return <View style={{flexDirection:"row"}}>
          <Text >Loading...</Text>
          </View>
    }else{
      return <ScrollView  
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={{flexDirection:"row", marginTop:3, marginLeft:8, marginRight:8}}>
            {
            boardDataArr.map((item, index) => ( 
              <TouchableHighlight activeOpacity={1} underlayColor='#a87bab'
              key={index} onPress={ () => {  
                setBoardType(item.id)
                onItemSelected(item.id)
                  }}>
                <View style={{backgroundColor: (item.id == boardType)?'#a87bab':'grey', 
                    marginLeft:2, 
                    marginRight:2}}>
                  <Text style={{color:'white'}}> {item.name}</Text>
                </View>
              </TouchableHighlight>
            ))
            }
            </ScrollView> 
    }
  };


  export default BoardType