import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

interface Props {
    buttonText: string;
    onPress: ()=>void;
    style?:string;
}

const CustomButton = ({buttonText, onPress,style}:Props) => {
  return (
    <TouchableOpacity onPress={onPress} className='bg-white rounded-md w-[40%] self-center'>
        <Text className='font-bold px-4 py-2 text-light-100 text-center'>{buttonText}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton