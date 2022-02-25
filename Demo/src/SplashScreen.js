
import { useIntl } from "react-intl";
import React, { Component, useState, useRef, useEffect } from 'react';
import {
    Text,
    View,
    Image
  } from 'react-native';

const SplashScreen = ({navigation}) => {

    const intl = useIntl();

    const storage = require('../src/utils/Storage.js');

    const [isFirstRunState, setIsFirstRun] = useState(false);

    useEffect(()=>{
        //component mount
        let isFirstRun = await storage.getStorage(storage.KEY.IS_FIRST_RUN);
        console.log("storage get isFirstRun = "+isFirstRun)
            if(isFirstRun != 'true'){
                isFirstRun = 'true';
                storage.setStorage(storage.KEY.IS_FIRST_RUN, isFirstRun);
            }else{
                console.log("storage setState true")
                setIsFirstRun(true);
            }
        // 함수안에서 처리시    
        /* storage.getStorage(storage.KEY.IS_FIRST_RUN).then(function(isFirstRun){
        }); */

        return () => {
            //component unmount
        };
        }, []
        );

    return (
        <View style={{justifyContent:'center', flex:1}}>
            { (isFirstRunState != true) &&
            <Image  style={{width:130, height:130, alignSelf:'center'}} resizeMode='contain' source={require('../assets/fantoo_intro.png')}/>
            }
        </View>
    )
}

export default SplashScreen