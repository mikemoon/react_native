import React, { Component, useEffect, useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, SafeAreaView,
    ScrollView, TouchableHighlight, Image, useColorScheme, Alert, FlatList, RefreshControl} from 'react-native';
import Swiper from 'react-native-swiper'
import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
  } from 'react-native/Libraries/NewAppScreen';
import { render } from 'react-native/Libraries/Renderer/implementations/ReactNativeRenderer-prod';
import { parse } from '@babel/core';
import Banner from '../src/main/Banner';
import BoardType from '../src/main/BoardType';
import BoardList from '../src/main/BoardList';
import Fansing from './main/Fansing';
import FansingChartScreen from './FansingChartScreen';

//const [bannerData, setBannerData] = useState(new Array());
const REQ = 'http://api.fantoo.co.kr:3000/api/main/cache';
const isDarkMode = false;


function MainScreen({navigation}){

  const [bannerData, setBannerData] = useState(null);
  const [boardData, setBoardData] = useState(null);
  const [selectedBoardType, setSelectBoardType] = useState(1);
  const [fansingChartList, setFansingChartList] = useState(null);

  //const navi =useNavigation();

  useEffect(()=>{
    fetchMainData(), getFansingChart()
  }, []);

  const fetchMainData = async()=>{
    getMain(REQ).then(
      result => 
      {
        console.log('resultDret = '+result.data+', '+result.data.board_main)
        console.log('resultDret2 = '+Object.keys(result.data.board_main.community).length)
        console.log('resultDret3 = '+JSON.stringify(result.data.board_main.community[0]))
        console.log('resultDret banner = '+JSON.stringify(result.data.banner))
        console.log('resultDret board = '+JSON.stringify(result.data.board_main))
        let i = 0;
        let tempArr = new Array();
        console.log('route = '+JSON.stringify(navigation))

        for (const banner of result.data.banner) {
          //console.log('bannner = '+banner)
          console.log('resultDretImg = '+banner.image)
          tempArr[i] = banner;
           i++; 
        }
  
        let j = 0;
        let boardDataArr = new Array();
        for(const community of result.data.board_main.community){
          let boardData = community;
          boardDataArr[j] = boardData;
          console.log('resultDBorad = '+community.name)                
          j++;
        }
        boardDataArrs = boardDataArr;
        setBannerData(tempArr);
        setBoardData(boardDataArr);
        console.log('setBoardData = '+JSON.stringify(boardDataArr))
    }
    )
  }

  const getFansingChart = async() => {
    console.log('getFansingChart start' )
    fetch('http://api.fantoo.co.kr:3000/api/livenew/fansing-ranking?&page=1&sortName=created_date', {method : 'GET'}).then(response => response.json()).then(
      result =>
      {
        console.log('getFansingChart ret = '+JSON.stringify(result))
        setFansingChartList(result.data);
      }
    )
  }

  const handleClick = (param) => {
    console.log("handleClick = "+JSON.stringify(param))
    navigation.navigate('WebViewScreen', {
      screen: 'WebViewScreen',
                            webUrl: param
    })
  }

  const onBoardTypeSelected = (id)=>{
    /* Alert.alert("board select "+id) */
    console.log("onBoardTypeSelected = "+JSON.stringify(id))
    setSelectBoardType(id);
  }

  

  const handleRefresh = (param) => {

  }

  const [refreshing, setRefreshing] = useState(false);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getFansingChart()
    fetchMainData()
    
    wait(1000).then(() => setRefreshing(false));
  }, []);

  return(
    <View >
            {/* top area start */}
            <View style={{flexDirection:'row'}}>
              <Image style={{width:120, height:60, marginLeft:15}} resizeMode='contain' source={require('../assets/fantoo_logo.png')}/>
              <View>
              <Image style={{width:120, height:60, marginLeft:15}} resizeMode='contain' source={require('../assets/icon_main_search.png')}/>
              </View>
            </View>
            {/* top area end */}
            <ScrollView
              contentInsetAdjustmentBehavior="automatic"
              showsVerticalScrollIndicator={false} 
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
              }
              style={backgroundStyle}>
               {/* <RViewPager dataArr={bannerData} />  */}
               <Banner bannerItems={bannerData} onItemClicked={handleClick} />
              <View
                style={{
                  backgroundColor: Colors.white,
                }}>
                <View style={{flexDirection:"row", marginLeft:20, marginRight:20, marginTop:5 }}>
                  <Text style={{fontSize:20, fontWeight :'bold', marginTop:5,}}>커뮤니티</Text>
                  <View style={{flexDirection:"row", position:'absolute', right:0,}}>
                  <TouchableHighlight activeOpacity={1} underlayColor='#f3f3f3'
                  onPress={ () => {  navigation.navigate('WebViewScreen', {
                screen: 'WebViewScreen',
                            webUrl: "http://webview.fantoo.co.kr/fanclub"
                      } ) }}>
                    <Text style={{fontSize:16, marginTop:5}}>더보기</Text>
                    </TouchableHighlight>
                    <Image style={{width:30, height:30}} resizeMode='contain' source={require('../assets/rightarr.png')}/>
                  </View>
                </View>
      
                <BoardType boardDataArr={boardData} onItemSelected={onBoardTypeSelected}/>

                <BoardList boardDataArr={boardData} selectedBoardType={selectedBoardType}/>

                <View style={{flexDirection:"row", marginLeft:20, marginRight:20, marginTop:5 }}>
                  <Text style={{fontSize:20, fontWeight :'bold', marginTop:5,}}>팬싱차트</Text>
                  <View style={{flexDirection:"row", position:'absolute', right:0,}}>
                  <TouchableHighlight onPress={ () => {  navigation.navigate('FansingChartScreen', {
                screen: 'FansingChartScreen',
                            webUrl: "http://webview.fantoo.co.kr/fanclub"
                      } ) }}>
                    <Text style={{fontSize:16, marginTop:5}}>더보기</Text>
                    </TouchableHighlight>
                    <Image style={{width:30, height:30}} resizeMode='contain' source={require('../assets/rightarr.png')}/>
                  </View>
                </View>

                <Fansing fansingChartList={fansingChartList} onItemClicked={handleClick}/>
                
                <Section title="Debug">
                  <DebugInstructions />
                </Section>
                <Section title="Learn More" imgUrl = 'http://kdg.fantoo.co.kr:5000/uploads_img/1641983118886.jpg'>
                  Read the docs to discover what to do next:
                </Section>
                
                <LearnMoreLinks /> 
              </View>
            </ScrollView>
          </View>
  )
}




  function LoopPager (props){
    if(props.bannerData == null){
      return <View style={styles.slide1}>
          <Text >Loading...</Text>
          </View>
    }else{
    return (
      <Swiper containerStyle={styles.bannerContainer}   autoplay={true} showsPagination={false} autoplayTimeout={2}
      >
         {/*  <View style={styles.slide1}>
            <Text >Beautiful</Text>
          </View> */}
          {
            props.bannerData.map((item, index) => ( 
              <TouchableHighlight key={index} onPress={ () => {  navigation.navigate('WebViewScreen', {
                screen: 'WebViewScreen',
                            webUrl: item.url
              } ) }}>
              <View  style={styles.slide1}>
                
                  <Image style={styles.imageType} resizeMode='contain' source={{uri : item.image}} /> 
                  
                </View> 
                </TouchableHighlight>
              ) 
            )
            }
      </Swiper>
    );
          }
  };


  const backgroundStyle = {
    backgroundColor: Colors.lighter,
  };

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

export function getMain(url = ''){
    return fetch('http://api.fantoo.co.kr:3000/api/main/cache/', {method : 'GET'}).then(response => response.json());
  }

export default MainScreen;  