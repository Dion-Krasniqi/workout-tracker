import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import CustomButton from '@/Components/button';
import { createCustomExercise } from '../db/queries';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { DropdownMenu, MenuOption } from '@/Components/dropDown';
import { SetView } from '@/Components/sessionComponents';

const Exercise_creation = () => {

  const router = useRouter();



  return (
    <SafeAreaProvider>
      <SafeAreaView className='bg-dark-100 ' style={{flex: 1}}> 
        <View  className='border-4 border-b-light-100 pb-5'>
         
         <View className="mx-2 px-5 mt-2">
            <View className='flex-row justify-between mb-5'>
                <Text className='text-light-100'>Started at 00:00</Text>
                <Text className='text-light-100'>Ended at 01:30</Text>
            </View>
            <View className='border-2 border-light-100 rounded-md h-[50] justify-center px-2 bg-white'>
                <Text className='font-bold text-center'>Push B</Text>
            </View>
         </View>
        </View>

      <View className="mx-2 px-5">

        
        <View>
            <SetView  set_number={2}/>
        </View>
        
        
        
      </View>
        
      
      
      
      
    </SafeAreaView>

    </SafeAreaProvider>
    
  );
}

export default Exercise_creation