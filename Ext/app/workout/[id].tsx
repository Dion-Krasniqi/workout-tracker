import { View, Text, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router';
import { getExercise, getWorkoutbyId } from '../db/queries';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '@/Components/button';

const WorkoutInformation = () => {
  const {id} = useLocalSearchParams();
  const [workout, setWorkout] = useState<TwoRows | null>(null);
  const router = useRouter();
  const [name, setName] = useState('');
  useEffect(()=>{
    async function setup(){
      const result = await getWorkoutbyId(parseInt(id));
      setWorkout(result);
    }
    setup();
  },[])


  return (
    <SafeAreaProvider>
         <SafeAreaView className='bg-dark-100' style={{flex: 1, alignItems: "center"}}> 
            <View className=" items-center mt-10 w-[80%]">
                <TextInput placeholder='Enter Workout Name' 
                   value={workout?.name}
                   placeholderTextColor={'darkgrey'}
                   className='text-center text-light-100 bg-white rounded-md px-4 w-full mb-4'/>

            
             </View>
             <View>
              <CustomButton buttonText='Add Exercise'/>
             </View>
             

         </SafeAreaView>
   </SafeAreaProvider>
  )
}

export default WorkoutInformation
