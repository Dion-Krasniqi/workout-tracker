import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import { getSetById } from '@/app/db/queries';
import { useLocalSearchParams } from 'expo-router';

export const setCard = () => {
  const {id} = useLocalSearchParams();
  const [setRef, setSetRef] = useState<SessionSet | null>(null);
  const [weight, setWeight] = useState(0);
  const [reps, setReps] = useState(0);

  return (
    <View>
        <Text>Set {setRef?.set_number}</Text>
        <Text>Weight:</Text>
        <TextInput placeholder={weight.toString()}
                   onChangeText={(text)=>setWeight(parseFloat(text))}
                   keyboardType='numeric'
                   placeholderTextColor={'darkgrey'}
                   className='text-start text-white border-2 border-light-100 rounded-md h-[50]'
                    />
        <Text>Reps:</Text>
        <TextInput placeholder={reps.toString()}
                   onChangeText={(text)=>setReps(parseInt(text))}
                   placeholderTextColor={'darkgrey'}
                   keyboardType='numeric'
                   className='text-start text-white border-2 border-light-100 rounded-md h-[50]'
                    />
    </View>
  )
}

