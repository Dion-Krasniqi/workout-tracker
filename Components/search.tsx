import React from 'react';
import { TextInput, View } from 'react-native';

interface Props {
    onPress?: () => void;
}

const Search = ({onPress}:Props) => {
  return (
    <View className='items-center bg-white rounded-2xl mt-4'>
        <TextInput onPress={onPress} placeholder='Search for session'
                                   placeholderTextColor={'darkgrey'}
                                   style={{width:'90%'}}
                                   className=' text-center text-light-100 mx-32'/>
      
    </View>
  )
}

export default Search