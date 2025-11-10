//not used

import AsyncStorage from '@react-native-async-storage/async-storage';

let currentTheme = '';

const loadTheme = async()=> {
  const savedTheme = await AsyncStorage.getItem('theme');
  if(savedTheme) {
    currentTheme = savedTheme
  }else{
    currentTheme = 'default';
  }
}

loadTheme();

export const setSystemTheme = async(value:string)=> { 
        currentTheme = value;
        try {
          await AsyncStorage.setItem('theme', value);

        } catch (e){
          console.log('Falied to change theme', e);
        }
};

export const getSystemTheme = ()=> { return currentTheme };