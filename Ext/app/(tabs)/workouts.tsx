import { View, Text, FlatList, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '@/Components/button'
import { createCustomExercise, createCustomWorkout, getAllWorkoutTemplates } from '../db/queries'
import { Link, useRouter } from 'expo-router'
import NameCard from '@/Components/nameCard'

const Workouts = () => {
  
  const router = useRouter();
  const [workouts, setWorkouts] = useState<TwoRows[]>([]);

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
    <ScrollView className="flex w-full px-5 mb-24" showsVerticalScrollIndicator={false} 
        contentContainerStyle={{ minHeight:'100%'}}>
      <View className='mt-10 gap-5 w-auto'>
        <CustomButton onPress={()=>createCustomWorkout('Push C')} buttonText='Create Workout' />
        <CustomButton onPress={()=>router.push('/otherPages/exercise_list')} buttonText='Exercise List' />
      </View>
      <View className='flex-1 w-[100%]'>
        <>
          <FlatList data={workouts}
            renderItem={({item})=>(<NameCard {...item} />)}
            keyExtractor={(item) =>item.id.toString()}
            className="mt-8 w-full self-center"
            scrollEnabled={false}/>

        
        </>
      </View>
    </ScrollView>
    
      

      
      
      
      
    </SafeAreaView>

    </SafeAreaProvider>
  )
}

export default Workouts