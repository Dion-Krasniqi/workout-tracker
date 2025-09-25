import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

interface Props {
    buttonText: string;
    link: string;
}

const CustomButton = ({buttonText, link}:Props) => {
  return (
    <TouchableOpacity className='bg-white rounded-md'>
        <Text className='font-bold px-4 py-2 text-light-100'>{buttonText}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton