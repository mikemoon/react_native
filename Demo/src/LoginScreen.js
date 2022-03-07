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

const LoginScreen = (navigation) => {

    const storage = require('../src/utils/Storage.js');
    const intl = useIntl();


    let currentLang = 'english';
    console.log("current langu = "+intl.locale)

    const [showLanguageSet, setShowLanguageSet] = useState(false);
    
    const languaguesList = [
        LocaleItem('ko', '한국어', ''),
        LocaleItem('en', 'English', ''),
        LocaleItem('jp', '日本語', ''),
        LocaleItem('zh-CN', '中国語(簡体)', ''),
        LocaleItem('zh-TW', '中国語(繁體)', ''),
        LocaleItem('id', 'Bahasa Indonesia', ''),
        LocaleItem('es', 'español', ''),
        LocaleItem('fr', 'français', ''),
        LocaleItem('ru', 'Русский', '')
        ]        
    
    const onLanguageItemSelect=(localeItem)=>{
        console.log('onLanguageItemSelect = '+localeItem.itemName)
        storage.setStorage("lang", localeItem.code).then(result =>{
            intl.locale = result;
            setShowLanguageSet(false)
            window.location.reload();
        })
    }

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
                <LocaleSelector languagueList={languaguesList} onItemSelect={onLanguageItemSelect} />
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
}

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

const LocaleItem =(code, name, imageUrl) =>{
        return {
            code: code,
            itemName: name,
            imgUrl:imageUrl
        }
}

export default LoginScreen
