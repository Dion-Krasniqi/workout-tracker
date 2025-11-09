import AsyncStorage from '@react-native-async-storage/async-storage';

let currentTheme = 'default';

const loadTheme = async()=> {
  const savedTheme = await AsyncStorage.getItem('theme');
  if(savedTheme) currentTheme = savedTheme;
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