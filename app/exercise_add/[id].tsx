import CustomButton from '@/Components/button';
import { ExerciseInfo } from '@/interfaces/interfaces';
import { useWorkoutStore } from '@/state/stateStore';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Text, TextInput } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { getExercise } from '../db/queries';

const ExerciseAddPage = () => {
  const router = useRouter();
  const {id,workout_id} = useLocalSearchParams();
  const [exerciseRef, setExerciseRef] = useState<ExerciseInfo | null>(null);
  const [sets, setSets] = useState(1);

  const addExerciseToWorkout = useWorkoutStore((state)=>state.addExerciseToWorkout);

  useEffect(()=>{
      async function setup(){
        //@ts-ignore
        const result = await getExercise(parseInt(id));
        setExerciseRef(result);
      }
      setup();
    },[])
  
  return (
    <SafeAreaProvider>
        <SafeAreaView className='bg-dark-100' style={{flex: 1, alignItems: "center"}}>
            <Text className='text-white font-semibold text-2xl mt-12'>{exerciseRef?.name}</Text>
            <Text className='text-light-100 text-xl mt-12'>Number of Sets</Text>
            <TextInput defaultValue='1' placeholder='1'
                       placeholderTextColor={'darkgrey'}
                       keyboardType="numeric"
                       onChangeText={(text)=>setSets(parseInt(text))} 
                       className='text-center text-white border-2 
                                  border-light-100 rounded-md
                                  w-[70%] mb-4'/>
            
            <CustomButton buttonText='Add Exercise' 
                          onPress={()=>{//@ts-ignore
                                   addExerciseToWorkout(Number(workout_id),exerciseRef?.id,exerciseRef?.name,sets);
                                   router.push(`/workout/${workout_id}`)}}/>
        </SafeAreaView>
    </SafeAreaProvider>)}

export default ExerciseAddPage