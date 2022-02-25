import React, { Component, useRef } from "react";
import WebView from "react-native-webview";


function WebViewScreen({route}) {
    console.log("weburi = "+JSON.stringify(route))
    return(
        <WebView
             source = {{uri : route.params.webUrl}}
            />
    )
}


export default WebViewScreen;  