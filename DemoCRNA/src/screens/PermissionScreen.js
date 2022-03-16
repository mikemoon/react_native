import React, { Component, useState, useRef, useEffect } from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    Platform
  } from 'react-native';
import { useIntl } from "react-intl";
//import {check, checkMultiple, requestMultiple, PERMISSIONS, RESULTS} from 'react-native-permissions';



let rnPermissionsObj, REQ_PERMISSIONS;    

const PermissionScreen = ({navigation}) => {

    const intl = useIntl();
    let allGranted = true;

    useEffect(()=>{
        //mount
        const isIOS = (Platform.OS === 'ios');
        const isAOS = (Platform.OS == 'android')  
        console.log("os = "+isIOS+" , aos = "+isAOS+", "+Platform.OS);
        if(isIOS || isAOS){
            const {check, checkMultiple, requestMultiple, PERMISSIONS, RESULTS} = React.lazy(
                ()=> import('react-native-permissions')
              )
              console.log("permissionObj = "+JSON.stringify(PERMISSIONS));
              REQ_PERMISSIONS = [PERMISSIONS.ANDROID.CAMERA, 
                PERMISSIONS.ANDROID.READ_CONTACTS, 
                PERMISSIONS.ANDROID.RECORD_AUDIO, 
                PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION];
                if(isAOS){
                    checkMultiple(REQ_PERMISSIONS).then((statuses) => {
                console.log('Camera', statuses[PERMISSIONS.ANDROID.CAMERA]);
                console.log('READ_CONTACTS', statuses[PERMISSIONS.ANDROID.READ_CONTACTS]);
                console.log('RECORD_AUDIO', statuses[PERMISSIONS.ANDROID.RECORD_AUDIO]);
                console.log('ACCESS_FINE_LOCATION', statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION]);
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
                <Image  style={{width:50, height:50, alignSelf:'center'}} resizeMode='contain' source={require('../../assets/fantoo_intro.png')}/>
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
                            requestAndroidPermission(REQ_PERMISSIONS, navigation);
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
    rnPermissionsObj.requestMultiple(permissions).then((statuses) => {
            console.log('Camera', statuses[rnPermissionsObj.PERMISSIONS.ANDROID.CAMERA]);
            console.log('READ_CONTACTS', statuses[rnPermissionsObj.PERMISSIONS.ANDROID.READ_CONTACTS]);
            console.log('RECORD_AUDIO', statuses[rnPermissionsObj.PERMISSIONS.ANDROID.RECORD_AUDIO]);
            console.log('ACCESS_FINE_LOCATION', statuses[rnPermissionsObj.PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION]);
            moveToLogin(navigation);
      });
}

const moveToLogin = (navigation) =>{
    console.log("moveToLogin");
    navigation.replace('LoginScreen', {
        screen: 'LoginScreen',
                              param: ''
      })
}

export default PermissionScreen