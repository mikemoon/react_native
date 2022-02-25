import React, { Component, useEffect, useState } from 'react'; 
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, SafeAreaView,
    ScrollView, TouchableHighlight, Image, useColorScheme} from 'react-native';

const Fansing = ({fansingChartList, onItemClicked}) =>{

    if(fansingChartList == null){
        return <View style={styles.slide1}/>
    }else{
    return(
        <ScrollView horizontal={true} style={{marginTop:8}}>
            {
                fansingChartList.map((fasingChart, index) => (
                    <TouchableHighlight key={index} onPress={ () => {  
                        onItemClicked(fasingChart.vod_url)
                          }}>
                        <View>
                            <Image style={styles.imageType} resizeMode='contain' source={{uri : fasingChart.thumbnail}}/>      
                            <Text style={{textAlign:'center', marginTop:3}}>{fasingChart.create_title}</Text>
                            <Text style={{textAlign:'center'}}>{fasingChart.user_nickname}</Text>
                        </View>
                    </TouchableHighlight>
                ))
            }
        </ScrollView>
    )
    }
}

const styles = StyleSheet.create({
    imageType : {
        width : 150, 
        height : 150,
      },
});

export default Fansing