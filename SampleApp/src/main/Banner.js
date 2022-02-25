import { useNavigation } from '@react-navigation/native';
import React, { Component, useEffect, useState } from 'react'; 
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, SafeAreaView,
    ScrollView, TouchableHighlight, Image, useColorScheme} from 'react-native';
    import Swiper from 'react-native-swiper'
    import {
        Colors,
        DebugInstructions,
        Header,
        LearnMoreLinks,
        ReloadInstructions,
      } from 'react-native/Libraries/NewAppScreen';

  const Banner =({bannerItems, onItemClicked}) =>{
    
    if(bannerItems == null || bannerItems.length < 1){
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
            bannerItems.map((item, index) => ( 
              <TouchableHighlight key={index} onPress={ () => {  
                onItemClicked(item.url)
                  }}>
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

  export default Banner