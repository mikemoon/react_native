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

const PermissionScreen = ({navigation}) => {

    const intl = useIntl();

    useEffect(()=>{
        //mount
        const isIOS = (Platform.OS === 'ios');


        if(isIOS){
            
        }else{//android
            PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA).then((result => {
                console.log('check result = '+result+" , "+(result === PermissionsAndroid.RESULTS.GRANTED))
                if(result === PermissionsAndroid.RESULTS.GRANTED){

                }else{
                    //let result = async() =>{ await requestPermission(PermissionsAndroid.PERMISSIONS.CAMERA);}
                    //result()
                    let permissions = [PermissionsAndroid.PERMISSIONS.CAMERA,
                        PermissionsAndroid.PERMISSIONS.ACCESS_MEDIA_LOCATION,
                        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
                        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
                    ];
                    requestAndroidPermission(permissions).then((result)=>
                    {
                        console.log("result = "+result);
                        if(result['android.permission.CAMERA'] 
                            && result['android.permission.ACCESS_MEDIA_LOCATION'] 
                            && result['android.permission.READ_CONTACTS'] 
                            && result['android.permission.RECORD_AUDIO'] 
                            && result['android.permission.ACCESS_FINE_LOCATION'] 
                            === 'granted'){
                                console.log("result granted")
                            }else{
                                console.log("result not granted")
                            }
                    });
                }
            }
            ));

            
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
                <Text style={{alignSelf:'center', width:'50%', textAlign:'center', marginTop:5}} >{intl.formatMessage({id:"permissions_title", defaultMessage:""})}</Text>
            </View>
            <View style={{backgroundColor:'grey', width:'80%', height:1, alignSelf:'center', marginTop:25}} />

            <View style={{marginTop:30, marginLeft:30}}>
                <Text style={{fontWeight:'bold', width:'50%',  marginTop:5}} >{intl.formatMessage({id:"camera", defaultMessage:""})}
                {' '}{intl.formatMessage({id:"permissions_select", defaultMessage:""})} </Text>
                <Text style={{marginTop:3, fontSize:12}}>{intl.formatMessage({id:"permissions_camera", defaultMessage:""})}</Text>
            </View>

            
            <View style={{marginTop:30, marginLeft:30}}>
                <Text style={{fontWeight:'bold', width:'50%',  marginTop:5}} >{intl.formatMessage({id:"picture_media_file", defaultMessage:""})}
                {' '}{intl.formatMessage({id:"permissions_select", defaultMessage:""})} </Text>
                <Text style={{marginTop:3, fontSize:12}}>{intl.formatMessage({id:"permissions_picture_media_file", defaultMessage:""})}</Text>
            </View>

            <View style={{marginTop:30, marginLeft:30}}>
                <Text style={{fontWeight:'bold', width:'50%',  marginTop:5}} >{intl.formatMessage({id:"contacts", defaultMessage:""})}
                {' '}{intl.formatMessage({id:"permissions_select", defaultMessage:""})} </Text>
                <Text style={{marginTop:3, fontSize:12}}>{intl.formatMessage({id:"permissions_contacts", defaultMessage:""})}</Text>
            </View>

            <View style={{marginTop:30, marginLeft:30}}>
                <Text style={{fontWeight:'bold', width:'50%',  marginTop:5}} >{intl.formatMessage({id:"audio", defaultMessage:""})}
                {' '}{intl.formatMessage({id:"permissions_select", defaultMessage:""})} </Text>
                <Text style={{marginTop:3, fontSize:12}}>{intl.formatMessage({id:"permissions_audio", defaultMessage:""})}</Text>
            </View>

            <View style={{marginTop:30, marginLeft:30}}>
                <Text style={{fontWeight:'bold', width:'50%',  marginTop:5}} >{intl.formatMessage({id:"location_info", defaultMessage:""})}
                {' '}{intl.formatMessage({id:"permissions_select", defaultMessage:""})} </Text>
                <Text style={{marginTop:3, fontSize:12}}>{intl.formatMessage({id:"permissions_location_info", defaultMessage:""})}</Text>
            </View>

            <Text style={{marginTop:30, fontSize:12, marginLeft:25}}>{intl.formatMessage({id:"permissions_desc_tail", defaultMessage:""})}</Text>

            <TouchableOpacity
                         onPress={()=> {}
                            /* navigation.replace('MainScreen' , {
                            screen: 'MainScreen',
                            info: 'information'
                        } ) */
                        } 
                        style={{
                            alignSelf:'center',
                            backgroundColor: 'rgb(87,174,198)',
                            padding: 20,
                            marginTop: 28,
                            borderRadius: 10,
                            width:'80%'
                        }}>
                        <Text style={{fontSize: 15, textAlign: 'center', 
                            color: 'white'}}>{intl.formatMessage({id:"next", defaultMessage:""})}</Text>
                </TouchableOpacity>
        </View>
    )

}

export async function requestAndroidPermission(permissions) 
{
  try {
    const result = await PermissionsAndroid.requestMultiple(
      permissions
    )
    return await result;
  } catch (err) {
    console.warn(err)
  }
}

export default PermissionScreen