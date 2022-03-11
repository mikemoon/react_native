import React from 'react';
import { GoogleSignin } from "@react-native-community/google-signin";

import {
    Button
  } from 'react-native';

const GoogleSignInCustomButton = () =>{
    const onGoogleButtonPress = async () =>{
        const {idToken} = await GoogleSignin.signIn();
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        console.log("GoogleSignInCustomButton token = "+idToken+" , credential = "+googleCredential);
        return auth().signInWithCredential(googleCredential);
    }
    return <Button title='구글로그인' onPress={onGoogleButtonPress} />
}

export default GoogleSignInCustomButton;