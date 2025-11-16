import { NameCardExecAdd } from '@/Components/nameCard';
import Search from '@/Components/search';
import { ExerciseInfo } from '@/interfaces/interfaces';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { getAllExercises, getAllExercisesSearch } from '../db/queries';

const Exercise_list_add = () => {
  const {workout_id} = useLocalSearchParams();
  const muscleGroups = ['None','Chest','Back','Shoulders','Arms','Legs','Abs'];
  const [exercises, setExercises] = useState<ExerciseInfo[]>([]);
  const [group, setGroup] = useState(0);
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
      if(query.trim() || group!=0){
        let qResult;
        // kinda weird
        if(group!=0){
          qResult = await getAllExercisesSearch(query,group);
        }else{
          qResult = await getAllExercisesSearch(query);
        }
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
  },[query,group]);

  const handleFilterChange = ()=> {
    if (group>=6){
      setGroup(0);
    } else{
      setGroup(group+1);
    }
  }



  return (
    <SafeAreaProvider>
     <SafeAreaView className='flex-1 bg-dark-100' style={{ alignItems: "center"}}> 
      <View className='flex-1 w-full items-center'>
       <View className='mt-4 items-center'>
        <Text className='text-white text-2xl font-bold '>Exercise List</Text>
       </View>
       <>
        <View style={{width:'90%'}}>
         <Search pholder='Search Exercise' value={query} onChangeText={(text)=>{setQuery(text)}}/>
          <TouchableOpacity className='bg-white rounded-md' style={{alignSelf:'center',
                                                            alignItems:'center',
                                                            justifyContent:'center',
                                                            width:'25%',
                                                            marginTop:20}} onPress={handleFilterChange} >
           <Text className='font-bold text-dark-200' style={{paddingVertical:5}}>{muscleGroups[group]}</Text>
          </TouchableOpacity>
        </View>
        <FlatList data={exercises}
                  //@ts-ignore
                  renderItem={({item})=>(<NameCardExecAdd id={item.id} name={item.name} workout_id={workout_id}/>)}
                  keyExtractor={(item) =>item.id.toString()}
                  className="mt-6 w-full" contentContainerStyle={{justifyContent:'space-between'}}/>
       </>
      </View>
     </SafeAreaView>
    </SafeAreaProvider>)
}

export default Exercise_list_add