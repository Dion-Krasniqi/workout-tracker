import { View, Text, TextInput, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '@/Components/button';
import { NameCardExec } from '@/Components/nameCard';
import { useSessionStore, useWorkoutStore } from '@/state/stateStore';

const WorkoutInformation = () => {

  const { id } = useLocalSearchParams();
  const {workouts, loading} = useWorkoutStore();
  const workout = workouts.find((w) => w.id === Number(id));
  const beginSession = useSessionStore((state)=>state.startSession);

  if(loading){
    return(<Text>Loading Workouts</Text>)
  }
  if (!workout) {
    return(<Text>Workout not found</Text>)
  }
  //const [exercises, setExercises] = useState<DetailedExercise[]>([]);
  const router = useRouter();
  
  useEffect(()=>{
    if (workout){
      useWorkoutStore.getState().loadExercises(workout.id)
    }
  },[workout?.id])

  const [name, setName] = useState(workout.name);

  return (
    <SafeAreaProvider>
         <SafeAreaView className='bg-dark-100' style={{flex: 1, alignItems: "center"}}> 
            <View className=" items-center mt-10 w-[80%]">
                <TextInput placeholder={name} 
                   onChangeText={(text)=>setName(text)}
                   placeholderTextColor={'darkgrey'}
                   className='text-center text-light-100 bg-white rounded-md px-4 w-full'/>

            
             </View>
             <FlatList data={workout.exercises}
                       renderItem={({item})=>(<View className='flex-row w-[90%] mt-2 py-4 px-4 bg-dark-200 rounded-md border-2 border-[rgba(255,255,255,0.05)] items-center justify-between self-center'>
                                                <Text className='text-white text-lg font-bold'>{item.name}</Text>
                                                <Text className='text-white '>{item.set_number} Sets</Text>
                                              </View>)}
                       keyExtractor={(item) =>item.id.toString()}
                       className="mt-6 w-full"
                       contentContainerStyle={{justifyContent:'space-between'}}/>

             <View className='mt-2'>
              <CustomButton buttonText='Add Exercise' onPress={()=>router.push({pathname: '/otherPages/exercise_list_adding',
                                                                                params: {workout_id:workout?.id}})}/>
             </View>
             <View className='mt-4'>
                                         
                                         <CustomButton buttonText='Start Workout' 
                                                                onPress={()=>{beginSession(workout?.id);}}/>
            </View>
             <View className='mt-4'>
                                         
                                         <CustomButton buttonText='Back' 
                                                                onPress={()=>router.push('/(tabs)/workouts')}/>
            </View>
             

         </SafeAreaView>
   </SafeAreaProvider>
  )
}

export default WorkoutInformation
