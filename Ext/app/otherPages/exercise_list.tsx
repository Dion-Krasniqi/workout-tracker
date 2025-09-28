import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { getAllExercises } from '../db/queries';
import NameCard from '@/Components/nameCard';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import CustomButton from '@/Components/button';

const Exercise_list = () => {

  const router = useRouter();
  const [exercises, setExercises] = useState<TwoRows[]>([]);

  useEffect(()=>{
    async function setup (){
        const result =  await getAllExercises();
        console.log(result);
        setExercises(result);
    }
    setup();
  },[])

  return (
    <SafeAreaProvider>
      <SafeAreaView className='flex-1 bg-dark-100' style={{ alignItems: "center"}}> 

      <View className='mt-6'>
          <CustomButton onPress={()=>router.push('/otherPages/exercise_creation')} buttonText='Create Exercise' />
        </View>
      <View className='w-full pb-20'>
        
            
        <>
            <FlatList data={exercises}
            renderItem={({item})=>(<NameCard {...item} />)}
            keyExtractor={(item) =>item.id.toString()}
            className="mt-6 w-full"
            contentContainerStyle={{justifyContent:'space-between'}}
            />
        </>
      </View>
          
        
        
      
      
      
    </SafeAreaView>

    </SafeAreaProvider>
  )
}

export default Exercise_list