import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

interface Props {
    buttonText: string;
    link: string;
}

const CustomButton = ({buttonText, link}:Props) => {
  return (
    <TouchableOpacity >
        <Text className='text-white'>{buttonText} ff</Text>
    </TouchableOpacity>
  )
}

export default CustomButton