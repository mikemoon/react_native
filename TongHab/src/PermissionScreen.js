import React, { Component, useState, useRef, useEffect } from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    Platform,
    PermissionsAndroid
  } from 'react-native';
import { useIntl } from "react-intl";

const PERMISSIONS = [PermissionsAndroid.PERMISSIONS.CAMERA,
    PermissionsAndroid.PERMISSIONS.ACCESS_MEDIA_LOCATION,
    PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
    PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
];

const PermissionScreen = ({navigation}) => {

    const intl = useIntl();
    let allGranted = true;

    useEffect(()=>{
        //mount
        const isIOS = (Platform.OS === 'ios');


        if(isIOS){
            
        }else{//android

            let cnt = 0;
            let permissionResults = [];
            for(const permission of PERMISSIONS){
                    checkAndroidPermission(permission).then(result =>{
                        console.log('check permission = '+permission+'+ ReturnResult = '+result)
                        permissionResults[cnt] = result;
                        cnt++;
                        if(permission == PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION){
                            for(const ret of permissionResults){
                                if(!ret){
                                    allGranted = false;
                                    break;
                                }
                            }
                            if(allGranted){
                                console.log('all check pass')
                                moveToLogin(navigation);
                            }else{
                                console.log('all check fail')
                                //requestAndroidPermission(PERMISSIONS, navigation);
                            }
                        }                
                    });   
            }

            
        }
    return () => {
        //component unmount
    };
    }, []
    );

    return(
        <View>
            <View style={{marginTop:80}}>
                <Image  style={{width:50, height:50, alignSelf:'center'}} resizeMode='contain' source={require('../assets/fantoo_intro.png')}/>
                <Text style={{alignSelf:'center', width:'50%', textAlign:'center', marginTop:5}} >{intl.formatMessage({id:"permissions_title", defaultMessage:"Please allow the following access rights for convenient service use."})}</Text>
            </View>
            <View style={{backgroundColor:'grey', width:'80%', height:1, alignSelf:'center', marginTop:25}} />

            <DescriptionLayout intl={intl} title={intl.formatMessage({id:"camera", defaultMessage:""})} desc={intl.formatMessage({id:"permissions_camera", defaultMessage:""})}/>

            <DescriptionLayout intl={intl} title={intl.formatMessage({id:"picture_media_file", defaultMessage:""})} desc={intl.formatMessage({id:"permissions_picture_media_file", defaultMessage:""})}/>

            <DescriptionLayout intl={intl} title={intl.formatMessage({id:"contacts", defaultMessage:""})} desc={intl.formatMessage({id:"permissions_contacts", defaultMessage:""})}/>
            
            <DescriptionLayout intl={intl} title={intl.formatMessage({id:"audio", defaultMessage:""})} desc={intl.formatMessage({id:"permissions_audio", defaultMessage:""})}/>

            <DescriptionLayout intl={intl} title={intl.formatMessage({id:"location_info", defaultMessage:""})} desc={intl.formatMessage({id:"permissions_location_info", defaultMessage:""})}/>
 
            <Text style={{marginTop:30, fontSize:12, marginLeft:25}}>{intl.formatMessage({id:"permissions_desc_tail", defaultMessage:""})}</Text>

            <TouchableOpacity
                         onPress={()=> {
                            requestAndroidPermission(PERMISSIONS, navigation);
                         }
                        } 
                        style={{
                            alignSelf:'center',
                            backgroundColor: '#1E98D7',
                            padding: 20,
                            marginTop: 28,
                            borderRadius: 10,
                            width:'80%',
                            height:60
                        }}>
                        <Text style={{fontSize: 15, textAlign: 'center', 
                            color: 'white'}}>{intl.formatMessage({id:"next", defaultMessage:""})}</Text>
                </TouchableOpacity>
        </View>
    )

}

const DescriptionLayout=(texts) =>{
    return(
        <View style={{marginTop:30, marginLeft:30}}>
                <Text style={{fontWeight:'bold', width:'50%',  marginTop:5}}>{texts.title}
                {' '}{texts.intl.formatMessage({id:"permissions_select", defaultMessage:""})} 
                </Text>
                <Text style={{marginTop:3, fontSize:12}}>{texts.desc}</Text>
            </View>
    )
}

const checkAndroidPermission = async(permission) => {
    const ret = await PermissionsAndroid.check(permission);
    console.log('check permission = '+permission+', result = '+ret+" , "+(ret === PermissionsAndroid.RESULTS.GRANTED))
    return await ret;
    /* PermissionsAndroid.check(permission).then((result => {
        console.log('check permission = '+permission+'+ result = '+result+" , "+(result === PermissionsAndroid.RESULTS.GRANTED))
    })); */
}

async function requestAndroidPermission(permissions, navigation) 
{
  try {
    const result = await PermissionsAndroid.requestMultiple(
      permissions
    ).then((result)=>
    {
        if(Object.keys(result).every((result)=> result === 'granted')){
                console.log("result detail = "+result['android.permission.CAMERA'] +","
                +result['android.permission.ACCESS_MEDIA_LOCATION']+","
                +result['android.permission.READ_CONTACTS']+","
                +result['android.permission.RECORD_AUDIO'] +","+
                +result['android.permission.ACCESS_FINE_LOCATION'] )
                console.log("result granted")
            }else{
                console.log("result not granted")
            }
            moveToLogin(navigation);
    });
  } catch (err) {
    console.warn(err)
  }
}

const moveToLogin = (navigation) =>{
    navigation.replace('LoginScreen', {
        screen: 'LoginScreen',
                              param: ''
      })
}

export default PermissionScreen