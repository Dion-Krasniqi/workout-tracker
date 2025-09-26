import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import CustomButton from '@/Components/button';
import { createCustomExercise } from '../db/queries';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const Exercise_creation = () => {

  const router = useRouter();

  const [exerciseName, setExerciseName] = useState('');

  const pressButton = () => {
    try {
        createCustomExercise(exerciseName);
        router.push('/(tabs)');
    } catch (error){
        console.log(error)
    }

  }

  return (
    <SafeAreaProvider>
      <SafeAreaView className='bg-dark-100' style={{flex: 1, alignItems: "center"}}> 

      <View className="mx-2 items-center mt-10">
        <TextInput placeholder='Enter Exercise Name' 
                   value={exerciseName} 
                   onChangeText={setExerciseName} 
                   placeholderTextColor={'darkgrey'}
                   className='text-center text-light-100'/>
        {exerciseName.length>0 && <CustomButton onPress={()=>pressButton()} buttonText='Create Exercise' />}
      </View>
      
      
      
    </SafeAreaView>

    </SafeAreaProvider>
    
  );
}

export default Exercise_creation