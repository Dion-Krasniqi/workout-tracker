import React from 'react';
import { TextInput, View } from 'react-native';


const Search = ({onPress, value, onChangeText}:{onPress?:()=>void;value?:string;onChangeText?:(text:string)=>void}) => {
  return (
    <View className='items-center bg-white rounded-2xl mt-4'>
        <TextInput onPress={onPress} placeholder='Search for session'
                                   placeholderTextColor={'darkgrey'}
                                   onChangeText={onChangeText}
                                   style={{width:'90%'}}
                                   className=' text-center text-light-100 mx-32'/>
      
    </View>
  )
}

export default Search