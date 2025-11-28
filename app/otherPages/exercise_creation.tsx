import CustomButton from '@/Components/button';
import { DropdownMenu, MenuOption } from '@/Components/dropDown';
import { exerciseStatic } from '@/constants/content';
import { useUserPreferences } from '@/state/stateStore';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { createCustomExercise } from '../db/queries';

const Exercise_creation = () => {

  const router = useRouter();
  const [visible, setVisible] = useState(false);

  const [exerciseName, setExerciseName] = useState('');
  const [muscleGroup, setMuscleGroup] = useState(1);
  const [muscleGroupText, setMuscleGroupText] = useState('None');

  const { language } = useUserPreferences();
  
  const MenuOptionView = (text:string) => {
    return(
      <View >
       <Text className='text-lg text-light-100'>{text}</Text>
      </View>)
  }

  const pressButton = () => {
    try {
        createCustomExercise(exerciseName, muscleGroup);
        router.push('/(tabs)');
    } catch (error){
        console.log(error)
    }
  }

  return (
    <SafeAreaProvider>
     <SafeAreaView className='bg-dark-100' style={{flex: 1}}> 
      <View className="mx-2 px-5 mt-10">
       <Text className='items-start text-light-100 text-xl mb-3' >{exerciseStatic.name[language]}</Text>
        <TextInput value={exerciseName} onChangeText={setExerciseName} 
                   placeholderTextColor={'darkgrey'}
                   className='text-start text-white border-2 border-light-100 rounded-md h-[50]'/>
        <Text className='items-start text-light-100 text-xl mt-5 mb-3'>{exerciseStatic.group[language]}</Text>
        <View>
          <DropdownMenu visible={visible}
                        handleOpen={()=>{setVisible(true)}}
                        handleClose={()=>{setVisible(false)}}
                        trigger={
                        <Text className='text-lg py-2 w-[full] text-start px-2 bg-white rounded-lg text-light-100'>
                         {muscleGroupText}
                        </Text>}>
                        {/*translate */}
           <MenuOption onSelect={()=>{setVisible(false);setMuscleGroup(1);setMuscleGroupText('None')}}>
              {MenuOptionView('None')}
           </MenuOption>
           <MenuOption onSelect={()=>{setVisible(false);setMuscleGroup(2);setMuscleGroupText('Chest')}}>
              {MenuOptionView('Chest')}
           </MenuOption>
           <MenuOption onSelect={()=>{setVisible(false);setMuscleGroup(3);setMuscleGroupText('Back')}}>
              {MenuOptionView('Back')}
           </MenuOption>
           <MenuOption onSelect={()=>{setVisible(false);setMuscleGroup(5);setMuscleGroupText('Shoulders')}}>
              {MenuOptionView('Shoulders')}
           </MenuOption>
           <MenuOption onSelect={()=>{setVisible(false);setMuscleGroup(6);setMuscleGroupText('Arms')}}>
              {MenuOptionView('Arms')}
           </MenuOption>
           <MenuOption onSelect={()=>{setVisible(false);setMuscleGroup(6);setMuscleGroupText('Legs')}}>
              {MenuOptionView('Legs')}
           </MenuOption>
           <MenuOption onSelect={()=>{setVisible(false);setMuscleGroup(7);setMuscleGroupText('Abs')}}>
              {MenuOptionView('Abs')}
           </MenuOption>

          </DropdownMenu>
        </View>
        <View className='mt-72'>
          {exerciseName.length>0 && <CustomButton onPress={()=>pressButton()} buttonText={exerciseStatic.create[language]} />}
        </View>
       </View>
    </SafeAreaView>
    </SafeAreaProvider>)
}

export default Exercise_creation