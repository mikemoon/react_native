import  AsyncStorage  from '@react-native-async-storage/async-storage'


const obj = {};

obj.KEY = {
    IS_FIRST_RUN : 'is_first_run'
}

obj.setStorage = async(key,  value)=>{
    try{
        console.log("storage setStorage  "+value+", key = "+key)
        await AsyncStorage.setItem(key, value)
    }catch(e){

    }
}

obj.getStorage = async(key)=>{
    console.log("storage getStorage get key : "+key)
    /* return new Promise((resolve, reject) =>{
        AsyncStorage.getItem(key, (err, result) => {
            resolve(result);
            console.log("storage getStorage get : "+result);
        });
    }
    
    ); */
    return await AsyncStorage.getItem(key);
    
}

module.exports = obj;