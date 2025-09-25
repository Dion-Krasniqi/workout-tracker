import { View, Text, Image, TextInput } from 'react-native'
import React from 'react'

interface Props {
    onPress?: () => void;
    value: string;
    onChangeText: (text: string) => void;
}

const Search = ({onPress, value, onChangeText}:Props) => {
  return (
    <View className='flex-row items-center bg-white rounded-2xl px-2 py-2 '>
        <TextInput onPress={onPress} placeholder='Search for workout' 
                                   value={value} 
                                   onChangeText={onChangeText} 
                                   placeholderTextColor={'darkgrey'}
                                   className='flex-1 text-center text-light-100'/>
      
    </View>
  )
}

export default Search