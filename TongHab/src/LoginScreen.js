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
import { LocalSvg } from 'react-native-svg';
import recentLoginFrontMark from '../assets/normal_u83.svg';
  
import { useIntl } from "react-intl";
import { TouchableHighlight } from 'react-native-gesture-handler';
import { inject, observer } from 'mobx-react';
import MobXStore from './MobXStore.js';
import { observable } from 'mobx';

import languaguesList from './strings/languaguesList.js';
import LocaleItem from './LocaleItem.js';

import GoogleSignInCustomButton from './socialLogin/GoogleSignInCustomButton';

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
        })
    }

    const [recentlyLoginAccountName, setRecentlyLoginAccountName] = useState('');

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


    const login = (account) =>{
        console.log('login account = '+account+"  , navi = "+JSON.stringify(navigation.navigation))
        if(account == 'guest'){
            navigation.navigation.navigate('Main' , {
                screen: 'BottomNav',
                info: 'information'
            } ) 
        }
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
                <LocaleSelector languagueList={langList} onItemSelect={onLanguageItemSelect} />
            </View>
            }

            <Image style={{alignSelf:'center', width:150, height:150, marginTop:10}} resizeMode='contain' source={require('../assets/fantoo_intro.png')}/>

            <Text style={{textAlign:'center', marginTop:20}}>{intl.formatMessage({id:"login_center_desc", defaultMessage:""})}</Text>    
            
            {/* 최근 로그인  */}
            <View style={{flexDirection:'row', marginTop:50, alignItems:'center', justifyContent:'center'}}>
                <LocalSvg asset={recentLoginFrontMark}/>
                <Text style={{marginLeft:3}}>{intl.formatMessage({id:"recent_login_account", defaultMessage:""})}</Text>
                <Text >{recentlyLoginAccountName}</Text>
            </View>

            {/* 최근 로그인버튼 */}
            <View style={{marginTop:10}}>
                {/* <TouchableOpacity
                    onPress={()=>{login}}
                    >
                    <View  title=''
                    style={styles.button} />
                    { GoogleSigninButton 
                    구글 로긴 API 버튼 사용 필요
                    }
                </TouchableOpacity> 
                */}
                <GoogleSignInCustomButton />
            </View>


            <View style={{
                alignItems: 'center',}}>
                <TouchableOpacity
                    onPress={()=>{login("guest")}}
                    >
                <Text style={{marginTop:200 }}>{intl.formatMessage({id:"guest_in", defaultMessage:""})}</Text>
                </TouchableOpacity>                    
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

const styles = StyleSheet.create({
    button:{
        height:40,
        marginLeft:25,
        marginRight:25,
        padding: 2,
        borderWidth: 1,
        solid: '#797979',
        backgroundColor:'#ffffff',
        box:'border-box',
        color: '#333333',
        textAlign : 'center',
        line:'normal'
    }
  });

export default LoginScreen
