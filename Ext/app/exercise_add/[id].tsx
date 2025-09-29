import { View, Text, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { useLocalSearchParams, useRouter } from 'expo-router';
import { getExercise } from '../db/queries';
import CustomButton from '@/Components/button';

const ExerciseAddPage = () => {
  const router = useRouter();
  const {id,workout_id} = useLocalSearchParams();
  const [exerciseRef, setExerciseRef] = useState<TwoRows | null>(null);
  const [sets, setSets] = useState(1);




  useEffect(()=>{
      async function setup(){
        //@ts-ignore
        const result = await getExercise(parseInt(id));
        setExerciseRef(result);
      }
      setup();
    },[])


  async function addExercise(){
    router.push(`/workout/${workout_id}`)
  }

  
  return (
    <SafeAreaProvider>
        <SafeAreaView className='bg-dark-100' style={{flex: 1, alignItems: "center"}}>
            <Text className='text-white font-semibold text-2xl mt-12'>{exerciseRef?.name}</Text>
            <Text className='text-light-100 text-xl mt-12'>Number of Sets</Text>
            <TextInput 
                        defaultValue='1'
                        onChangeText={(text)=>setSets(parseInt(text))}
                        keyboardType="numeric"
                        placeholder='1'
                        placeholderTextColor={'darkgrey'}
                        className='text-center
                                   text-white
                                   border-2 
                                   border-light-100
                                   rounded-md
                                   w-[70%]
                                   mb-4'/>
            <CustomButton buttonText='Add Exercise' onPress={()=>addExercise()}/>
        </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default ExerciseAddPage