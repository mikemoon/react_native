import React, { Component, useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Image, Alert, TextInput} from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import { Button } from 'react-native-paper';
import { useIntl } from "react-intl";

const LoginScreen = ({navigation}) => {

    const LOGIN_URL = "http://devapi.fantoo.co.kr:3000/user/login"
    
    const [networkConnected, setNetworkConnectState] = useState(false);

    const [emailTxt, setEmailText] = useState('');
    const [passwordTxt, setPasswordText] = useState('');

    const [loginBtnActive, setLoginButtonActive] = useState(false);

    const intl = useIntl();
    
    const storage = require('../src/util/Storage.js');
    
    NetInfo.fetch().then(state => {
        console.log("Connection type"+ state.type);
        console.log("Is connected?"+ state.isConnected);
        setNetworkConnectState(state.isConnected)
      });

      const handleConnectivityChange = (connection) =>{
        if(networkConnected != connection.isConnected){
            console.log("handleConnectivityChange type"+ connection.type);
            console.log("handleConnectivityChange Is connected?"+ connection.isConnected);
            setNetworkConnectState(connection.isConnected)
        }
      }

        useEffect(() => {
            const unsubscribe = NetInfo.addEventListener(handleConnectivityChange);
            return unsubscribe;
          }, []);

        useEffect(()=>{
            //component mount
            console.log("storage get test! = "+JSON.stringify(storage.getStorage("test")))

            return () => {
                //component unmount
                console.log("storage set test = "+storage.setStorage("test", "mytest"))
            };
            }, []
            );

      useEffect(() =>{
        updateActiveStateLoginButton();
      },[emailTxt, passwordTxt]
      )

    const OnChangeText = (name, ev) =>{
        console.log("OnChangeText name = "+name+" , text ="+ev);
        if(name == 'email'){
            setEmailText(ev)
        }else if(name == 'password'){
            setPasswordText(ev)
        }
    }

    const updateActiveStateLoginButton=()=>{
        console.log("OnChangeText last emailTxt = "+emailTxt+" , passwordTxt ="+passwordTxt);
        if(emailTxt != 'undefined' && emailTxt.length > 0 && passwordTxt != 'undefined' && passwordTxt.length > 0){
            if(loginBtnActive == false){
                setLoginButtonActive(true)
            }
        }else{
            if(loginBtnActive == true){
                setLoginButtonActive(false)
            }
        }
    }

    const login = () =>{
        if(networkConnected){
            var datas = {method:'POST',
                        headers : {
                                "Content-Type": "application/json",
                                'Dup_Login_State' : false,
                                //'Device-ID': 'cwhJLAl-mxI:APA91bGVmeU0FR0e2I_hewjyOiV2z4g22bSsl66XALRSuWtfekAnBaCxnsjWb1RUtvBBl3HpuP436SiQdi7zhsRSbPiYRINLvZ1wL6ui3ThM_nQkHDY6-0jASkGuQrRIcAMdjYFXmtJA'
                                },
                        body: JSON.stringify({
                            "userid":emailTxt,
                            "password":passwordTxt
                            }) 
                         };
            console.log("login info = "+JSON.stringify(datas));
                fetch(LOGIN_URL, 
                 datas
                ).then(res => res.json())
                .then(res =>{
                    console.log("login result = "+res+", "+JSON.stringify(res))
                    if(res.success){
                        navigation.replace('MainScreen' , {
                            screen: 'MainScreen',
                            info: 'information'
                        } )
                    }else if(res.result == '3001'){
                        Alert.alert(intl.formatMessage({id:"invalid_login_info", defaultMessage:"invalid_login_info"})) 
                    }else{
                       Alert.alert(intl.formatMessage({id:"unregisterd_member", defaultMessage:""}))
                    }
                }).catch(function(e){
                    console.log("login err"+e)
                });
        }else{
            //인터넷연결 확인 팝업
        }
    }

    return(
        <View style={styles.container}>
                <StatusBar barStyle="dark-content" />
                
                <View>
                    <Image style={{width:104, height:99, alignSelf:'center', marginTop:20}} source={require('../assets/intro_logo.png')} />
                    <Text style={{fontSize:25, alignSelf:'center', marginTop:20}}>Login</Text>
                </View>
                <View style={{justifyContent:'center', width:"100%", flexDirection:'row', marginTop:30}}>
                    {/* <RadioButton name="Email" />
                    <RadioButton style={{marginLeft:15}} name="Phone" /> */}
                    <RadioButtonGroup style={{width:'100%', height:"100%"}} names={["Email","Phone"]}/>
                </View>

                <View style={{width:'100%', alignItems:'center'}}> 
                    <UselessTextInput
                            style={styles.input}
                            placeholder="Email"
                            name='email'
                            onChangeText={OnChangeText}
                        />
                        <UselessTextInput
                            style={styles.input}
                            placeholder="비밀번호"
                            name='password'
                            onChangeText={OnChangeText}
                            isSecureText={true}
                        />
                </View>

                <TouchableOpacity
                        disabled={loginBtnActive == false}
                         onPress={()=> 
                            login()
                            /* navigation.replace('MainScreen' , {
                            screen: 'MainScreen',
                            info: 'information'
                        } ) */
                        } 
                        style={{
                            alignSelf:'center',
                            backgroundColor: loginBtnActive ? 'rgb(87,174,198)': '#E1DDDC',
                            padding: 20,
                            marginTop: 30,
                            borderRadius: 30,
                            width:200
                        }}>
                        <Text style={{fontSize: 20, textAlign: 'center', 
                            color: loginBtnActive? 'white' : '#858484'}}>확인</Text>
                </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    }
    ,

    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },
})

const RadioButtonGroup = (props) => {
    const [selectedIndex, setSelectChild] = useState(0);

    const selectedCallback=(id)=>{
        console.log("selectedCallback "+id)
        setSelectChild(id)
        //To do, type selected

    }

    return props.names.map((radioButtonName, index)=>(
        <RadioButton key={index} style={{marginLeft: (index > 0 ? 10 : 0)}} name={radioButtonName} 
            onSelectedCallBack={selectedCallback} id={index} selected={index == selectedIndex}/>
    ))
}

function RadioButton(props) {
    const [selected, setSelect] = useState(0);
    return (
        <TouchableOpacity onPress={()=>{
            setSelect(1)
            props.onSelectedCallBack(props.id)
            console.log('selected = '+selected)
        }}>
        <View style={{flexDirection:"row"}}>
            <View style={[{
            height: 24,
            width: 24,
            borderRadius: 12,
            borderWidth: 2,
            borderColor: (props.selected == true)  ? '#40e0d0' :'#000',
            alignItems: 'center',
            justifyContent: 'center',
            }, props.style]}>
            {
                (props.selected == true) ?
                <View style={{
                    height: 12,
                    width: 12,
                    borderRadius: 6,
                    backgroundColor: '#40e0d0',
                }}/>
                : null
            }
            </View>
            <Text style={{marginLeft:10}}>{props.name}</Text>
        </View>    
        </TouchableOpacity>
    );
  }

  const UselessTextInput = (props) => {
    const [value, setChangeText] = React.useState('');
    
    return (
      <View
        style={{
          backgroundColor: value,
          borderBottomColor: '#40e0d0',
          borderBottomWidth: 1,
          width:200
        }}>
        <TextInput
          numberOfLines={1}
          autoCapitalize = 'none'
          onChangeText={text => 
            {
                props.onChangeText(props.name, text)
                setChangeText(text);
            }}
          secureTextEntry={props.isSecureText}
          value={value}
          style={{padding: 10}}
          placeholder={props.placeholder}
          maxLength={20}
        />
      </View>
    );
  }

export default LoginScreen;  