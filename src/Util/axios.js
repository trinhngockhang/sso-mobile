import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
const newAxios = async function(){
  return new Promise(async (resolve, reject) => {
    const token = await AsyncStorage.getItem('token');
    console.log(token);
    const headers = {
        Authentication: `Bearer ${token}`,
    };
    const instance = axios.create({
      baseURL: "http://52.187.21.233:3001",
      headers: {'authorization': `Bearer ${token}`,'Accept': "application/json", 
      'Content-Type':"application/json",
      'Access-Control-Allow-Origin': '*'}
    });
    resolve(instance);
  })
}

export default newAxios; 