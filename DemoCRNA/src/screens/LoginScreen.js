import React, { Component, useState, useRef, useEffect, useCallback, Suspense } from 'react';
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
import recentLoginFrontMark from '../../assets/normal_u83.svg';

import "intl/locale-data/jsonp/en";
import 'intl/locale-data/jsonp/id';

import { useIntl } from "react-intl";
import { TouchableHighlight } from 'react-native-gesture-handler';
import { inject, observer } from 'mobx-react';
import MobXStore from '../utils/MobXStore.js';
//import { observable } from 'mobx';

import {STORAGE} from '../constants/Values'
import  AsyncStorage  from '@react-native-async-storage/async-storage'
import languaguesList from '../../src/strings/languagesList.js';
import LocaleItem from '../../src/strings/LocaleItem.js';

import axios from 'axios';

import {GOOGLE_LOGIN, APIServerURL} from '../../src/constants/Values'
import { GoogleLogin , useGoogleLogin } from 'react-google-login'
import GoogleSignInCustomButton from '../../src/socialLogin/GoogleSignInCustomButton';


const LoginScreen = ({navigation}) => {

    const {localeStore} = MobXStore();

    const intl = useIntl();

    const [showLanguageSet, setShowLanguageSet] = useState(false);
    const [currentLang, setLang] = useState('');
    
    const axios = require('axios');

    const langList = languaguesList;
    
    const onLanguageItemSelect = useCallback((localeItem)=>{
        console.log('onLanguageItemSelect = '+localeItem.itemName)
        const changeLang = (async() => {await AsyncStorage.setItem(STORAGE.key_lang, localeItem.code).then(result =>{
            localeStore.setLocale(localeItem.code);
            console.log('onLanguageItemSelect done mobx store ='+JSON.stringify(localeStore))
            intl.locale = localeItem.code;
            setLang(localeItem.itemName)
            setShowLanguageSet(false)
            })
        })
        changeLang()
    })

    const isWeb = !(Platform.OS == 'ios' || Platform.OS == 'android')


    let googleClientId = '';
    if(Platform.OS == 'ios'){
        googleClientId = GOOGLE_LOGIN.CLIENT_ID_IOS;
    }else if(Platform.OS == 'aos'){
        googleClientId = GOOGLE_LOGIN.CLIENT_ID_AOS;
    }else{
        googleClientId = GOOGLE_LOGIN.CLIENT_ID_WEB;
    }

    console.log("current langu = "+intl.locale+" , isWeb = "+isWeb)

    const [recentlyLoginAccountName, setRecentlyLoginAccountName] = useState('');

    useEffect(()=>{
        if(!isWeb){
             /* import(`${"../../src/socialLogin/GoogleSignInCustomButton"}`).then(module => {
                lazyGoogleLoginComponent=module.default;
                setgoogleLoginComponentImported(true);
                console.log("lz module2 = "+JSON.stringify(module))
                module.test("111")
                }
                );  */
              /* const GoogleSignInCustomButton = React.lazy(
                ()=> import('../../src/socialLogin/GoogleSignInCustomButton')
              )  */
              /* import('../../src/socialLogin/GoogleSignInCustomButton')
                .then((module) => {
                    console.log("lz module = "+JSON.stringify(module))
                    LazyGoogleLoginComponent = module;
                    setgoogleLoginComponentImported(true);
                }); */
        }
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

    const responseGoogle = (response) => {
        console.log("responseGoogle"+response);
        console.log("responseGoogle"+JSON.stringify(response));
        try{
            let userInfo = {
                email : '',
                sns_type : 'google',
                uid : '',
            };
            let success = false;
            if(response.profileObj != undefined){//web
                //alert("google login sucess, email = "+response.profileObj.email)
                userInfo.email = response.profileObj.email;
                userInfo.uid = response.profileObj.googleId;
                success = true;
            }else if(response.user != undefined){//mobile
                //alert("google login sucess, email = "+response.user.email)
                userInfo.email = response.user.email;
                userInfo.uid = response.user.id;
                success = true;
            }else{
                //error
                //alert("google login failed")
            }
            if(success){
                moveToMain();
                //getAuthCode(userInfo);
            }
        }catch(e){
            console.log("responseGoogle"+JSON.stringify(e));
        }
    }

    const getAuthCode = (userInfo) =>{
        let form = new FormData();
        form.append("client_id" , 'c39b637f8fd111ec8428e73e37da3a03');
        form.append("lang" , 'ko');
        form.append("response_type" , 'code');
        form.append("service_name" , 'fantoo');
        form.append("service_sort" , 'fantoo_sns');
        form.append("sns_id" , userInfo.email);
        form.append("sns_sort" , userInfo.sns_type);
        form.append("sns_uid" , userInfo.uid);
        const params = {
            client_id : 'c39b637f8fd111ec8428e73e37da3a03',
            lang : 'ko',
            response_type : 'code',
            service_name : 'fantoo',
            service_sort : 'fantoo_sns',
            sns_id : userInfo.email,
            sns_sort : userInfo.sns_type,
            sns_uid : userInfo.uid
        }
        const axiosConfig = {
            headers:{
                "Content-Type": "application/json"
            }
        }
        console.log("getAuth param = "+JSON.stringify(params))
        axios.interceptors.request.use(function (config) {
            // Do something before request is sent
            console.log("axios before : "+JSON.stringify(config))
            return config;
          }, function (error) {
            // Do something with request error
            return Promise.reject(error);
          });
        axios.post(APIServerURL.baseUrl+APIServerURL.get_a1_AuthCode, params, axiosConfig)/* .interceptors.request.use(
            request => {
                console.log('Starting Request', JSON.stringify(request, null, 2))
                return request
            }
        ) */
        .then(function (response){
            console.log("result = "+JSON.stringify(response))
        }).catch(function (error){
            console.log("error = "+JSON.stringify(error))
        })
        
    }

    const getAccessToken = () =>{
        const params = {}
        axios.post(APIServerURL.baseUrl+APIServerURL.get_a2_AccessToken, params)
        .then(function (response){

        }).catch(function (error){

        })
    }

    const moveToMain = () =>{
        console.log("moveToLogin");
        navigation.replace('Main', {
            screen: 'Main',
                                  param: ''
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
                            <Image style={{alignSelf:'center'}} resizeMode='contain' 
                                source={require('../../assets/normal_u22.png')}/>
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
            
            <Image style={{alignSelf:'center', width:150, height:150, marginTop:10}} resizeMode='contain' source={require('../../assets/fantoo_intro.png')}/>

            <Text style={{textAlign:'center', marginTop:20}}>{intl.formatMessage({id:"login_center_desc", defaultMessage:""})}</Text>    
            
            {/* 최근 로그인  */}
            <View style={{flexDirection:'row', marginTop:50, alignItems:'center', justifyContent:'center'}}>
                {/* {!isWeb && <LocalSvg xml={recentLoginFrontMark}/> } */}
                {<Image style={{width:10, height:10}} resizeMode='contain' source={recentLoginFrontMark} /> }
                <Text style={{marginLeft:3}}>{intl.formatMessage({id:"recent_login_account", defaultMessage:""})}</Text>
                <Text >{recentlyLoginAccountName}</Text>
            </View>
            {/* 최근 로그인버튼 */}
            <View style={{marginTop:10 , width:300, alignSelf:'center'}}>
                {!isWeb && <GoogleSignInCustomButton onResponseGoogle={responseGoogle} />}
                {isWeb && <GoogleLogin
                    clientId={GOOGLE_LOGIN.CLIENT_ID_WEB}
                    buttonText="Login"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />}
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
                        <Image resizeMode='contain' source={require('../../assets/normal_u22.png')}/>
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
