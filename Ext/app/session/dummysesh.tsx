import { View, Text, TextInput, ScrollView, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomButton from '@/Components/button';
import { createCustomExercise } from '../db/queries';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { DropdownMenu, MenuOption } from '@/Components/dropDown';
import { ExerciseView, SetView } from '@/Components/sessionComponents';
import { useSessionStore } from '@/state/stateStore';

const Exercise_creation = () => {

  const router = useRouter();
  const workout_id = 1;
  const beginSession = useSessionStore((state)=>state.startSession);
  const loadExercises = useSessionStore((state)=>state.loadExercisesWithSets);
  const {activeSession, loading} = useSessionStore();
  
 


  useEffect(()=>{
    const session = beginSession(workout_id);
    loadExercises(workout_id, session.id);
  },[workout_id]);

  if(loading){
    return (<View><Text>Session Loading...</Text></View>)
  }


  //@ts-ignore
  const time = new Date(activeSession?.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  return (
    <SafeAreaProvider>
      <SafeAreaView className='bg-dark-100 ' style={{flex: 1}}> 
        <View  className='border-b-4 border-b-light-100 pb-5'>
         
         <View className="mx-2 px-5 mt-2">
            <View className='flex-row justify-between mb-5'>
                <Text className='text-light-100'>Started at {time}</Text>
                <Text className='text-light-100'>Ended at 01:30</Text>
            </View>
            <View className=' rounded-md h-[50] justify-center px-2 bg-white'>
                <Text className='font-bold text-center'>Push A</Text>
            </View>
         </View>
        </View>

      <View className="mx-2">

       <FlatList data={activeSession?.exercises}
                 keyExtractor={(item)=>item.id.toString()}
                 renderItem={({item})=>(<View className='rounded-lg bg-dark-200 mb-2'>
                                          <ExerciseView exercise={item}/>
                                        </View>)}
                 contentContainerStyle={{paddingBottom:120}}
                 />
        
        
      </View>
        
      
      
      
      
    </SafeAreaView>

    </SafeAreaProvider>
    
  );
}

export default Exercise_creation