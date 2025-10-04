import { View, Text, TextInput, ScrollView } from 'react-native'
import React, { useState } from 'react'
import CustomButton from '@/Components/button';
import { createCustomExercise } from '../db/queries';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { DropdownMenu, MenuOption } from '@/Components/dropDown';
import { ExerciseView, SetView } from '@/Components/sessionComponents';

const Exercise_creation = () => {

  const router = useRouter();



  return (
    <SafeAreaProvider>
      <SafeAreaView className='bg-dark-100 ' style={{flex: 1}}> 
        <View  className='border-b-4 border-b-light-100 pb-5'>
         
         <View className="mx-2 px-5 mt-2">
            <View className='flex-row justify-between mb-5'>
                <Text className='text-light-100'>Started at 00:00</Text>
                <Text className='text-light-100'>Ended at 01:30</Text>
            </View>
            <View className=' rounded-md h-[50] justify-center px-2 bg-white'>
                <Text className='font-bold text-center'>Push B</Text>
            </View>
         </View>
        </View>

      <View className="mx-2">

       <ScrollView className=''>
          <View className='rounded-lg bg-dark-200 mb-2'>
              <ExerciseView  name={'Bench Press'} sets={[1,2,3]}/>
          </View>
          <View className='rounded-lg bg-dark-200 mb-2'>
            <ExerciseView  name={'Pec Fly'} sets={[1,2]}/>
          </View>
          <View className='rounded-lg bg-dark-200 mb-2'>
            <ExerciseView  name={'Bicep Curl'} sets={[1,2]}/>
          </View>
          <View className='rounded-lg bg-dark-200 mb-2'>
            <ExerciseView  name={'Overhead Press'} sets={[1,2]}/>
          </View>
          <View className='rounded-lg bg-dark-200 mb-40'>
            <ExerciseView  name={'Overhead Press'} sets={[1,2]}/>
          </View>
        </ScrollView>
        
      </View>
        
      
      
      
      
    </SafeAreaView>

    </SafeAreaProvider>
    
  );
}

export default Exercise_creation