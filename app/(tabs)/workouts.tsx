import CustomButton from '@/Components/button'
import React, { useEffect } from 'react'
import { FlatList, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
//import { createCustomExercise, createCustomWorkout, getAllWorkoutTemplates } from '../db/queries'
import { useSessionStore, useWorkoutStore } from '@/state/stateStore'
import { Link, useRouter } from 'expo-router'
import { exportAllSetData } from '../db/db'

const Workouts = () => {
  
  const workouts = useWorkoutStore((state)=>state.workouts)
  const router = useRouter();
  const beginSession = useSessionStore((state)=>state.startSession);
  const loadExercises = useSessionStore((state)=>state.loadActiveExercisesWithSets);
  

  useEffect(() => {
    
  }, []);
  const startSession = async (workout_id:number)=>{
    const sesh = await beginSession(workout_id);
    await loadExercises(workout_id, sesh.id)
  };
  
  return (
    <SafeAreaProvider>
      <SafeAreaView
      className='bg-dark-100'
      style={{
        flex: 1,
        
        alignItems: "center",
      }} 
    > 
    <ScrollView className="flex w-full px-5 mb-24" showsVerticalScrollIndicator={false} 
        contentContainerStyle={{ minHeight:'100%'}}>
      <View className='mt-10 gap-5 w-auto'>
        <CustomButton onPress={()=>router.push('/otherPages/workout_creation')} buttonText='Create Workout' />
        <CustomButton onPress={()=>router.push('/otherPages/exercise_list')} buttonText='Exercise List' />
      </View>
      <View className='flex-1 w-[100%]'>
        <>
          <FlatList data={workouts}
            renderItem={({item})=>(<Link href={`/workout/${item.id}`} asChild>
                                    <TouchableOpacity className='w-[90%] mt-2 py-2 bg-dark-200 rounded-md border-2 border-[rgba(255,255,255,0.1)] items-center self-center' onLongPress={async()=>{await startSession(item.id)}}>
                                      <Text className='text-white text-2xl font-md'>{item.name}</Text>
                                    </TouchableOpacity>
                                  </Link>)}
            keyExtractor={(item) =>item.id.toString()}
            className="mt-8 w-full self-center"
            scrollEnabled={false}
            ListFooterComponent={<CustomButton onPress={()=>exportAllSetData()} buttonText='Extract All Data' />}
            ListFooterComponentStyle={{marginTop:30}}/>

        
        </>
      </View>
      
    </ScrollView>
    
    
      

      
      
      
      
    </SafeAreaView>

    </SafeAreaProvider>
  )
}

export default Workouts