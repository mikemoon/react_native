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

const BoardList = ({boardDataArr, selectedBoardType}) =>{
    const navi =useNavigation();
    console.log('BoardList data = '+JSON.stringify(boardDataArr))  

    let selectedBoardData = null;
    if(boardDataArr == null){
      return (
        <View style={{flexDirection:"row"}}>
            <Text >Loading...</Text>
        </View>
        )
    }else{
      for(const boardData of boardDataArr){
        if(boardData != null && boardData.id == selectedBoardType){
          selectedBoardData = boardData;
          break;
        }
      }
    }

    if(selectedBoardData == null){
      return (
      <View style={{flexDirection:"row"}}>
          <Text >Loading...</Text>  
      </View>
      )
    }else{
      return selectedBoardData.board.filter((item, index) => index < 5).map((item, index) => (
        <View >
          <TouchableHighlight activeOpacity={1} underlayColor='#f3f3f3' key={index} onPress={ () => {  
            navi.navigate('WebViewScreen', {
            screen: 'WebViewScreen',
                        webUrl: "http://webview.fantoo.co.kr/board/detail/"+item.board_id
          } ) }}>
            <View style={{flexDirection:"row", marginLeft : 10, height:80}}>
              
                <View style={{flexDirection:"column", justifyContent: 'center'}}>
                  <Text style={{fontSize : 18, }}>{item.board_title}</Text>
                  <Text >{item.user_nickname}</Text>
                </View>
                <Image style={{width : 70, height : 70, alignSelf:'center', position:'absolute', right:10}} 
                  resizeMode='contain'  source={{uri : "http://img.fantoo.co.kr/"+item.board_img}}/>
                
            </View>
          </TouchableHighlight>
          <View
              style={{
                borderBottomColor: 'lightgrey',
                borderBottomWidth: 1,
                marginLeft:8,
                marginRight:8
              }}
              />
        </View>
      ))
    }
  };

    export default BoardList