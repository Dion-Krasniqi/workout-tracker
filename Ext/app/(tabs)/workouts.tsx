import { View, Text, FlatList, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '@/Components/button'
import { createCustomExercise, createCustomWorkout, getAllWorkoutTemplates } from '../db/queries'
import { useRouter } from 'expo-router'
import WorkoutCard from '@/Components/workoutCard'

const Workouts = () => {
  
  const router = useRouter();
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  useEffect(() => {
    async function setup() {
      const result = await getAllWorkoutTemplates();
      console.log(result);
      setWorkouts(result);
    }
    setup();
  }, []);
  
  
  return (
    <SafeAreaProvider>
      <SafeAreaView
      className='bg-dark-100'
      style={{
        flex: 1,
        
        alignItems: "center",
      }} 
    > 
      <View className='mt-10 gap-5'>
        <CustomButton onPress={()=>createCustomWorkout('Push A')} buttonText='Create Workout' />
        <CustomButton onPress={()=>router.push('/otherPages/exercise_creation')} buttonText='Add Exercise' />
      </View>
      <View className=' w-full'>
        <>
          <FlatList data={workouts}
            renderItem={({item})=>(<WorkoutCard {...item}/>)}
            keyExtractor={(item) =>item.id.toString()}
            className="mt-16 w-full"/>
        
        </>
      </View>
    
      

      
      
      
      
    </SafeAreaView>

    </SafeAreaProvider>
  )
}

export default Workouts