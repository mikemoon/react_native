
import { useIntl } from "react-intl";
import React, { Component, useState, useRef, useEffect } from 'react';
import {
    Text,
    View,
    Image
  } from 'react-native';
import  AsyncStorage  from '@react-native-async-storage/async-storage'
import {STORAGE} from '../constants/Values'
import { Platform } from "react-native-web";

const SplashScreen = ({navigation}) => {

    const intl = useIntl();

    const [isFirstRunState, setIsFirstRun] = useState(false);

    useEffect(()=>{
        //component mount

        const checkFistRun = (async()=>{
            await AsyncStorage.getItem(STORAGE.key_isFirstRun).then(function(isFirstRun){
                console.log("storage get isFirstRun = "+isFirstRun)
                if(isFirstRun != 'true'){
                    isFirstRun = 'true';
                    const set =(async()=>await AsyncStorage.setItem(STORAGE.key_isFirstRun, isFirstRun))
                    set();
                }else{
                    console.log("storage setState true")
                    setIsFirstRun(true);
                }

                setTimeout(() => {
                    let targetScreen = 'LoginScreen'
                    if(Platform.OS == 'ios' || Platform.OS == 'android'){
                        targetScreen = 'PermissionScreen'
                    }
                    navigation.replace(targetScreen , {
                        screen: targetScreen,
                        info: 'information'
                    } )
                },3000)
            });
        })

        checkFistRun();

        return () => {
            //component unmount
        };
        }, []
        );

    return (
        <View style={{justifyContent:'center', flex:1}}>
            <Image  style={{width:130, height:130, alignSelf:'center'}} resizeMode='contain' source={require('../../assets/fantoo_intro.png')}/>
        </View>
    )
}

export default SplashScreen