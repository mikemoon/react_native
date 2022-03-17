import React, {useEffect, useState} from 'react';

import {
    Button,
    View
  } from 'react-native';

let GoogleSignin = null;
let GoogleSigninButton = null;

const GoogleSignInCustomButton = ({onResponseGoogle}) =>{

    const [importedButton, setImportedButton] = useState(false);

    useEffect(()=>{
        //component mount
        import('@react-native-google-signin/google-signin').then((module) => {
            GoogleSignin = module.GoogleSignin;
            GoogleSigninButton = module.GoogleSigninButton;
            setImportedButton(true);
        })
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
    //GoogleSigninButton import하면 웹에서 에러가 발생하여 os체크후 늦게 rendering
    //known이슈 : button로그인 text가 기기 언어 설정으로 표시됨, 모듈에서 언어 변경지원이 없어 custom디자인으로 표시해야 할듯?
    //https://github.com/react-native-google-signin/google-signin/issues/938
    return( 
            <View style={{alignSelf:'center'}}>
                {importedButton && <GoogleSigninButton onPress={onGoogleButtonPress}/>}
            </View>
        )
    
}

export default GoogleSignInCustomButton