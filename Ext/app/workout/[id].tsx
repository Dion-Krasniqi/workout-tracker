import { View, Text, TextInput, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router';
import { getExercise, getWorkoutbyId, getWorkoutExercises } from '../db/queries';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '@/Components/button';
import { NameCardExec } from '@/Components/nameCard';
import { useWorkoutStore } from '@/state/stateStore';

const WorkoutInformation = () => {

  const { id } = useLocalSearchParams();
  const {workouts, loading} = useWorkoutStore();

  const workout = workouts.find((w) => w.id === Number(id));

  if(loading){
    return(<Text>Loading Workouts</Text>)
  }
  if (!workout) {
    return(<Text>Workout not found</Text>)
  }
  //const [exercises, setExercises] = useState<DetailedExercise[]>([]);
  const router = useRouter();
  const [name, setName] = useState('');
  useEffect(()=>{
    if (workout){
      useWorkoutStore.getState().loadExercises(workout.id)
    }
  },[workout?.id])


  return (
    <SafeAreaProvider>
         <SafeAreaView className='bg-dark-100' style={{flex: 1, alignItems: "center"}}> 
            <View className=" items-center mt-10 w-[80%]">
                <TextInput placeholder='Enter Workout Name' 
                   value={workout?.name}
                   placeholderTextColor={'darkgrey'}
                   className='text-center text-light-100 bg-white rounded-md px-4 w-full mb-4'/>

            
             </View>
             <FlatList data={workout.exercises}
                       renderItem={({item})=>(<View><Text className='text-white'>{item.name}</Text></View>)}
                       keyExtractor={(item) =>item.id.toString()}
                       className="mt-6 w-full"
                       contentContainerStyle={{justifyContent:'space-between'}}/>

             <View>
              <CustomButton buttonText='Add Exercise' onPress={()=>router.push({pathname: '/otherPages/exercise_list_adding',
                                                                                params: {workout_id:workout?.id}})}/>
             </View>
             <View className=''>
                                         
                                         <CustomButton buttonText='Back' 
                                                                onPress={()=>router.replace('/(tabs)/workouts')}/>
            </View>
             

         </SafeAreaView>
   </SafeAreaProvider>
  )
}

export default WorkoutInformation
