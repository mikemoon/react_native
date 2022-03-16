import React, {useEffect} from 'react';
//import { GoogleSignin } from "@react-native-google-signin/google-signin";

import {
    Button
  } from 'react-native';

let GoogleSignin = null;


const GoogleSignInCustomButton = ({onResponseGoogle}) =>{


    useEffect(()=>{
        //component mount
        import('@react-native-google-signin/google-signin').then((module) => {
            GoogleSignin = module.GoogleSignin;
        });

        return () => {
            //component unmount
        };
        }, []
        );
    
    

    const onGoogleButtonPress = async () =>{
        if(GoogleSignin != null){
            try{
                GoogleSignin.signIn().then((userInfo) => {
                    onResponseGoogle(userInfo);
                })
                /* const {idToken, userInfo} = await GoogleSignin.signIn();
                const googleCredential = auth.GoogleAuthProvider.credential(idToken);
                console.log("onGoogleButtonPress token = "+JSON.stringify(idToken)+" , uInfo = "+
                JSON.stringify(userInfo));
                return auth().signInWithCredential(googleCredential); */
            }catch(e){
                console.log("onGoogleButtonPress err "+JSON.stringify(e));
                if (e.code === statusCodes.SIGN_IN_CANCELLED) {
                    // user cancelled the login flow
                    alert("user cancelled")
                  } else if (e.code === statusCodes.IN_PROGRESS) {
                    // operation (f.e. sign in) is in progress already
                  } else if (e.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                    // play services not available or outdated
                  } else {
                    // some other error happened
                  }
            }
        }else{
            console.log("GoogleSignin module is null")
        }
    }
    return <Button  title='구글로그인' onPress={onGoogleButtonPress}/>
}

export default GoogleSignInCustomButton;