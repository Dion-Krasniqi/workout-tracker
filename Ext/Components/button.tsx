import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

interface Props {
    buttonText: string;
    onPress: ()=>void;
}

const CustomButton = ({buttonText, onPress}:Props) => {
  return (
    <TouchableOpacity onPress={onPress} className='bg-white rounded-md'>
        <Text className='font-bold px-4 py-2 text-light-100 text-center'>{buttonText}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton