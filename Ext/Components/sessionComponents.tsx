import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'

export const SetView = ({set_number,previous_weight}:{set_number:number;previous_weight?:number}) => {
  const [weight, setWeight] = useState(previous_weight ?? 0);

  return (
    <View className='mt-5'>
      <Text className='items-start text-light-100 text-xl mb-3'>Set {set_number}</Text>
      <TextInput placeholder={(weight).toString()}
                 keyboardType='numeric' 
                 onChangeText={(text)=>setWeight(Number(text))}
                 placeholderTextColor={'darkgrey'}
                 className='text-start px-2 text-white border-2 border-light-100 rounded-md h-[50]'/>
    </View>
  )
}
