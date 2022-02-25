import React, { Component, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, SafeAreaView,
    ScrollView, TouchableHighlight, Image, useColorScheme, Alert} from 'react-native';
import { FlatList } from "react-native-gesture-handler";

function FansingChartScreen(route){

    const [fansingDataList, setFansingDataList] = useState(null);

    const getFansingChartList=(page, sortName, userId)=>{
        fetch("http://api.fantoo.co.kr:3000/api/livenew/fansing-ranking?page="
        +page+"&sortName="+sortName+"&users_id="+userId, {method : 'GET'})
        .then(response => response.json())
        .then(data =>
            {
                console.log("getFansingChartList = "+JSON.stringify(data))
                setFansingDataList(data.data)
            }
            );
    }

    getFansingChartList("1", "created_date", "")

    const renderItem = ({item}) => (
        <TouchableHighlight activeOpacity={1} underlayColor='#f3f3f3' 
        onPress={ () => {  
            route.navigation.navigate('WebViewScreen', {
            screen: 'WebViewScreen',
                        webUrl: item.vod_url
          } ) }}
        >
            <View style={{width:200, height:250, alignItems:'center', flexDirection:'column', flex: 1}}>
                <Image style={{width : '100%', height : 200, }} 
                  resizeMode='contain'  source={{uri : item.thumbnail}}/>
                        <Text style={{color:'black', }}> {item.create_title}</Text>
                        <Text style={{color:'black', }}> {item.user_nickname}</Text>
            </View>
        </TouchableHighlight>
    );

    if(fansingDataList == null){
        return(
            <View >
                    <Text>loading...</Text>
            </View>
        )
    }else{
        return(
            <FlatList 
              key={'#'}
              data={fansingDataList}
              renderItem={renderItem}
              keyExtractor={item => "#"+item._id}
              numColumns={2}
            />
        )
    }



}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    item: {
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
  });

export default FansingChartScreen;