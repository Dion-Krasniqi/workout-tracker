import React from 'react';
import { TextInput, View } from 'react-native';


const Search = ({onPress, value, onChangeText,pholder}:{onPress?:()=>void;value?:string;onChangeText?:(text:string)=>void;pholder:string}) => {
  return (
    <View className='mt-4' style={{alignItems:'center',backgroundColor:'white',borderRadius:15, width:'100%'}}>
        <TextInput onPress={onPress} placeholder={pholder}
                                   placeholderTextColor={'darkgrey'}
                                   onChangeText={onChangeText}
                                   style={{width:'90%',textAlign:'center'}}
                                   className='text-light-100'/>
      
    </View>
  )
}

export default Search