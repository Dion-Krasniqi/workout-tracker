import { NameCardExecAdd } from '@/Components/nameCard';
import Search from '@/Components/search';
import { ExerciseInfo } from '@/interfaces/interfaces';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { getAllExercises, getAllExercisesSearch } from '../db/queries';

const Exercise_list_add = () => {
  const {workout_id} = useLocalSearchParams();
  const router = useRouter();
  const [exercises, setExercises] = useState<ExerciseInfo[]>([]);
  const [query, setQuery] = useState('');

  // initial loading
  useEffect(()=>{
    async function setup (){
        const result =  await getAllExercises();
        console.log(result);
        //@ts-ignore BUT FIGURE OUT WHEN TRANSLATING IT ZUSTAND
        setExercises(result);
    }
    setup();
  },[]);
  // querying
  useEffect(()=>{
    const timeOutId = setTimeout( async()=>{
      if(query.trim()){
        
        const qResult = await getAllExercisesSearch(query);
        if (qResult){
          //@ts-ignore
          setExercises(qResult)
        }
      } else {
        const result =  await getAllExercises();
        //@ts-ignore
        setExercises(result);
      };
    },500);

    return () => clearTimeout(timeOutId);
  },[query]);



  return (
    <SafeAreaProvider>
      <SafeAreaView className='flex-1 bg-dark-100' style={{ alignItems: "center"}}> 

      {/*<View className='mt-6'>
          <CustomButton onPress={()=>router.push('/otherPages/exercise_creation')} buttonText='Create Exercise' />
        </View>*/}
      <View className='flex-1 w-full items-center'>
        
          <View className='mt-4 items-center'>
            
            {/*{exercises.length>0 ? (<Text className='text-white text-2xl font-bold '>Exercise List</Text>):
            (<Text className='text-white text-2xl font-bold '>No exercises found</Text>)} It does have default exercises so maybe*/}
            <Text className='text-white text-2xl font-bold '>Exercise List</Text>
          </View>
        
          <>
            <View style={{width:'90%'}}>
              <Search pholder='Search Exercise' value={query} onChangeText={(text)=>{setQuery(text)}}/>
            </View>
            <FlatList data={exercises}
            //@ts-ignore
            renderItem={({item})=>(<NameCardExecAdd id={item.id} name={item.name} workout_id={workout_id}/>)}
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

export default Exercise_list_add