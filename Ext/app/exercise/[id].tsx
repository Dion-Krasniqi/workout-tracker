import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router';
import { getExercise } from '../db/queries';

const ExerciseInformation = () => {
  const {id} = useLocalSearchParams();
  const [exercise, setExercise] = useState<TwoRows | null>(null);
  useEffect(()=>{
    async function setup(){
      //@ts-ignore
      const result = await getExercise(parseInt(id));
      setExercise(result);
    }
    setup();
  },[])


  return (
    <View className='flex-1 item-center justify-center'>
      <Text className='text-black'>Stats for {exercise?.name}</Text>
    </View>
  )
}

export default ExerciseInformation