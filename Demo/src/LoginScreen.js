import React, { Component, useState, useRef, useEffect } from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    Platform
  } from 'react-native';
import { useIntl } from "react-intl";
import { TouchableHighlight } from 'react-native-gesture-handler';
import { inject, observer } from 'mobx-react';
import MobXStore from './MobXStore.js';
import { observable } from 'mobx';
import languaguesList from './strings/languaguesList.js';
import LocaleItem from './LocaleItem.js';

const LoginScreen = observer((navigation) => {

    const {localeStore} = MobXStore();

    const storage = require('../src/utils/Storage.js');
    const intl = useIntl();

    console.log("current langu = "+intl.locale)

    const [showLanguageSet, setShowLanguageSet] = useState(false);
    const [currentLang, setLang] = useState('');
    
    const langList = languaguesList;
    
    const onLanguageItemSelect=(localeItem)=>{
        console.log('onLanguageItemSelect = '+localeItem.itemName)
        storage.setStorage("lang", localeItem.code).then(result =>{
            localeStore.setLocale(localeItem.code);
            console.log('onLanguageItemSelect done mobx store ='+JSON.stringify(localeStore))
            intl.locale = localeItem.code;
            setLang(localeItem.itemName)
            setShowLanguageSet(false)
            //window.location.reload();
        })
    }

    useEffect(()=>{
        for(let i = 0; i < languaguesList.length; i++){
            if(languaguesList[i].code == intl.locale){
                setLang(languaguesList[i].itemName)
                break;
            }
        }
        return () => {
            //component unmount
        };
        }, []
        );

    return(
        <View>
           <View style={{marginLeft:14, marginRight:14}}>
            {/* Top      */}
                <View style={{alignItems:'flex-end', marginTop:35}}>
                    <TouchableHighlight activeOpacity={1} underlayColor='#bcbcbc' 
                onPress={
                        ()=>{
                            setShowLanguageSet(true)   
                        }
                    }>
                        <View style={{flexDirection:'row-reverse', margin:5}}>
                            <Text style={{marginLeft:5, textAlign:'center'}}>{currentLang}</Text>
                            <Image style={{alignSelf:'center'}} resizeMode='contain' source={require('../assets/normal_u22.png')}/>
                        </View>
                    </TouchableHighlight>
                </View>
            
            {/* 언어 선택 */}
            {showLanguageSet &&
            <View style={{borderStyle: 'solid', borderWidth:2, zIndex:3, elevation:3, position:'absolute', 
                backgroundColor:'white', alignSelf:'flex-end', marginTop:70}}>
                <LocaleSelector languagueList={langList} onItemSelect={onLanguageItemSelect} />
            </View>
            }

            <Image style={{alignSelf:'center', width:150, height:150, marginTop:10}} resizeMode='contain' source={require('../assets/fantoo_intro.png')}/>

            <Text style={{textAlign:'center', marginTop:20}}>{intl.formatMessage({id:"login_center_desc", defaultMessage:""})}</Text>    
            
            {/* 최근 로그인  */}
            <View>

            </View>

           </View> 
        </View>
    )
})

const LocaleSelector = ({languagueList, onItemSelect}) =>{
    return (
        <View style={{marginTop:5, marginBottom:5}}>
            {
            languagueList.map((item, index) => (
                <TouchableHighlight key={index} activeOpacity={1} underlayColor='#bcbcbc' 
                    onPress={
                    ()=>{
                        onItemSelect(item)
                    }
                }>
                    <View style={{flexDirection:'row', marginLeft:10, marginRight:10, marginTop:3, marginBottom :3}}>
                        <Image resizeMode='contain' source={require('../assets/normal_u22.png')}/>
                        <Text style={{marginLeft:5}}>{item.itemName}</Text>
                    </View>
                </TouchableHighlight>
            )
            )
            }
        </View>
    )
}



export default LoginScreen
