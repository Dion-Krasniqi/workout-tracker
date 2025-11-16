import CustomButton from '@/Components/button';
import { NameCardExec } from '@/Components/nameCard';
import { ExerciseInfo } from '@/interfaces/interfaces';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { getAllExercises } from '../db/queries';

const Exercise_list = () => {

  const router = useRouter();
  const [exercises, setExercises] = useState<ExerciseInfo[]>([]);

  useEffect(()=>{
    async function setup (){
        const result =  await getAllExercises();
        console.log(result);
        //@ts-ignore again zustand
        setExercises(result);
    }
    setup();
  },[])

  return (
    <SafeAreaProvider>
     <SafeAreaView className='flex-1 bg-dark-100' > 
      <View className='flex-row justify-between mb-5 items-center px-5 mt-5'>
       <TouchableOpacity className='items-center' onPress={()=>(router.push('/(tabs)/workouts'))}>
        <Image source={require('../../assets/icons/arrow.png')} style={{tintColor:'white', transform:[{scaleX:-1.2},{scaleY:1.2}]}}
               className='items-center'/>
       </TouchableOpacity>
       <CustomButton onPress={()=>router.push('/otherPages/exercise_creation')} buttonText='Create Exercise' />
      </View>
      <View className='w-full flex-1'>  
       <>
        <FlatList data={exercises} renderItem={({item})=>(<NameCardExec {...item} />)}
                  keyExtractor={(item) =>item.id.toString()}
                  className="mt-6 w-full" contentContainerStyle={{justifyContent:'space-between'}}/>
       </>
      </View>   
     </SafeAreaView>
    </SafeAreaProvider>)
}

export default Exercise_list