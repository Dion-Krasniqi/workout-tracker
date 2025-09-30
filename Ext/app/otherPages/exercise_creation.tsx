import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import CustomButton from '@/Components/button';
import { createCustomExercise } from '../db/queries';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { DropdownMenu, MenuOption } from '@/Components/dropDown';

const Exercise_creation = () => {

  const router = useRouter();

  const [exerciseName, setExerciseName] = useState('');
  const [muscleGroup, setMuscleGroup] = useState('None');
  const [visible, setVisible] = useState(false);

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
      <SafeAreaView className='bg-dark-100 ' style={{flex: 1}}> 

      <View className="mx-2 px-5 mt-10">
        <Text className='items-start text-light-100 text-xl mb-3' >Exercise Name:</Text>
        <TextInput 
                   value={exerciseName} 
                   onChangeText={setExerciseName} 
                   placeholderTextColor={'darkgrey'}
                   className='text-start text-white border-2 border-light-100 rounded-md h-[50]'/>
        <Text className='items-start text-light-100 text-xl mt-5 mb-3' >Muscle Group:</Text>
        <View>
          <DropdownMenu visible={visible}
                      handleOpen={()=>{setVisible(true)}}
                      handleClose={()=>{setVisible(false)}}
                      trigger={<Text className='text-lg py-2 w-[full] text-start px-2 bg-white rounded-lg text-light-100'>{muscleGroup}</Text>}>
            <MenuOption onSelect={()=>{setVisible(false);setMuscleGroup('None')}}>
              <View className=''>
                <Text className='text-lg text-light-100'>None</Text>
              </View>
              
              </MenuOption>
            <MenuOption onSelect={()=>{setVisible(false);setMuscleGroup('Chest')}}><Text className='text-lg text-light-100'>Chest</Text></MenuOption>

          </DropdownMenu>
        </View>
        <View className='mt-64'>
          {exerciseName.length>0 && <CustomButton onPress={()=>pressButton()} buttonText='Create Exercise' />}
        </View>
        
      </View>
      
      
      
    </SafeAreaView>

    </SafeAreaProvider>
    
  );
}

export default Exercise_creation