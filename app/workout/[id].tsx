import CustomButton from '@/Components/button';
import { useSessionStore, useWorkoutStore } from '@/state/stateStore';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const WorkoutInformation = () => {

  const { id } = useLocalSearchParams();
  const {workouts, loading} = useWorkoutStore();
  const workout = workouts.find((w) => w.id === Number(id));
  const beginSession = useSessionStore((state)=>state.startSession);
  const deleteExercise = useWorkoutStore((state)=>state.removeExerciseFromWorkout)

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
                       renderItem={({item})=>(<TouchableOpacity onLongPress={()=>deleteExercise(workout.id,item.id)}>
                        <View className='flex-row self-center w-[90%] mt-2 py-4 px-4 bg-dark-200 rounded-md border-2 border-[rgba(255,255,255,0.05)] items-center justify-between'>
                                                <Text className='text-white text-lg font-bold'>{item.name}</Text>
                                                <View className='flex-row items-center'>
                                                  <Text className='text-white mr-8'>{item.set_number} Sets</Text>
                                                  <View className='flex flex-row gap-2'>
                                                    {item.order_index>1 && (<TouchableOpacity >
                                                      <Text className='text-white font-bold' style={{transform:[{rotate:'-90deg'}]}}>➤</Text>
                                                    </TouchableOpacity>)}
                                                    {item.order_index<workout.exercises.at(-1)?.order_index && <TouchableOpacity >
                                                      <Text className='text-white font-bold' style={{transform:[{rotate:'90deg'}]}}>➤</Text>
                                                    </TouchableOpacity>}
                                                  
                                                  </View>
                                                </View>
                                              </View>
                       </TouchableOpacity>)}
                       keyExtractor={(item) =>item.id.toString()}
                       className="mt-6 w-full "/>

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
