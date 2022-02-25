import { AsyncStorage } from '@react-native-async-storage/async-storage'

const obj = {};
obj.setStorage = async(key,  value)=>{
    try{
        console.log("storage setStorage  "+value)
        await AsyncStorage.setItem('@key', value)
    }catch(e){

    }
}

obj.getStorage = async(key)=>{
    try{
        console.log("storage getStorage get key : "+key)
        const value = await AsyncStorage.getItem('@key');
        console.log("storage getStorage get : "+value)
        return value
    }catch(e){
        console.log("storage getStorage err"+e)
        console.log("storage getStorage err"+JSON.stringify(e))
        return '';
    }
}

module.exports = obj;