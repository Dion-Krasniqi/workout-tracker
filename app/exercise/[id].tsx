import { ExerciseInfo } from '@/interfaces/interfaces';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { getAllExerciseSets, getExercise } from '../db/queries';




const setEntry = (weight:number,reps:number,date:number)=>{
  const time = new Date(date).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'});
  return (
    
    <View className='items-center border-t-2 w-full self-center py-4 rounded-xl'>
      <Text className='text-white font-bold text-xl'>{weight}kg for {reps} reps at {time}</Text>
    </View>
  )
}

const ExerciseInformation = () => {
  const {id} = useLocalSearchParams();
  const [exercise, setExercise] = useState<ExerciseInfo | null>(null);
  const [sets, setSets] = useState<{weight:number;reps:number;date:number}[] | null>(null);
  
  useEffect(()=>{
    async function setup(){
      //@ts-ignore
      const result = await getExercise(parseInt(id));
      const data = await getAllExerciseSets(Number(id));
      setSets(data);
      
      setExercise(result);
    }
    setup();
  },[])

  
  return (
    
    <SafeAreaProvider>
      <SafeAreaView className='flex-1 bg-dark-100' style={{ alignItems: "center"}}> 

      <View className='mt-6'>
          <Text className='text-white font-bold text-2xl'>Stats for {exercise?.name}</Text>
        </View>
      <View className='w-full flex-1'>
        
            
        <>
            {sets && sets.length>0 ? (<FlatList data={sets}
            renderItem={({item})=>(setEntry(item.weight,item.reps,item.date))}
            className="mt-6 w-full"
            contentContainerStyle={{justifyContent:'space-between'}}
            />):(<View><Text className='text-white self-center mt-20'>There exists no data for this exercise</Text></View>)}
        </>
      </View>
          
    </SafeAreaView>

    </SafeAreaProvider>
  )
}

export default ExerciseInformation