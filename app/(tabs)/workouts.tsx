import CustomButton from '@/Components/button'
import Search from '@/Components/search'
import { WorkoutTemplate } from '@/interfaces/interfaces'
import { useSessionStore, useWorkoutStore } from '@/state/stateStore'
import { Link, useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { FlatList, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { exportAllSetData } from '../db/db'

const Workouts = () => {
  
  const router = useRouter();
  const [query, setQuery] = useState('');

  const workoutControl = useWorkoutStore();
  const beginSession = useSessionStore((state)=>state.startSession);
  const loadExercises = useSessionStore((state)=>state.loadActiveExercisesWithSets);
  const [workouts, setWorkouts] = useState<WorkoutTemplate[]>([]);
  
  // setup
  useEffect(()=>{
   const tempW = workoutControl.workouts;
   setWorkouts(tempW);
  },[]);

  useEffect(()=>{
   const timeOutId = setTimeout( async()=>{
    if(query.trim()){
      const qResult = workoutControl.workouts.filter((w)=>w.name.includes(query));
      if (qResult) {setWorkouts(qResult)};
    }else{ 
        const result = workoutControl.workouts;
        setWorkouts(result);
    }
   },500);

   return () => clearTimeout(timeOutId);
  },[query]);

  const startSession = async (workout_id:number)=>{
    const sesh = await beginSession(workout_id);
    await loadExercises(workout_id, sesh.id)
  };
  
  return (
    <SafeAreaProvider>
     <SafeAreaView className='bg-dark-100' style={{flex: 1,alignItems: "center",}}> 
      <ScrollView className="flex w-full px-5 mb-24" showsVerticalScrollIndicator={false} 
                  contentContainerStyle={{ minHeight:'100%'}}>
       <View style={{flexDirection:'row', marginTop:30, justifyContent:'space-between', 
                     alignItems:'center', marginHorizontal:25}}>
        <CustomButton onPress={()=>router.push('/otherPages/workout_creation')} buttonText='Create Workout'/>
        <CustomButton onPress={()=>router.push('/otherPages/exercise_list')} buttonText='Exercise List' />
       </View>
       <View className='flex-1 w-[100%]'>
        <>
         <FlatList data={workouts}
                   keyExtractor={(item) =>item.id.toString()}
                   className="mt-8 w-full self-center"
                   scrollEnabled={false}
                   ListHeaderComponent={<View style={{width:'87%', alignSelf:'center', marginBottom:30}}>
                                          <Search pholder='Search Workout' 
                                                  value={query} 
                                                  onChangeText={(text)=>{setQuery(text)}}/>
                                         </View>}
                    ListFooterComponent={<CustomButton onPress={()=>exportAllSetData()} buttonText='Extract All Data' />}
                    ListFooterComponentStyle={{marginTop:30}}
                   renderItem={({item})=>(<Link href={`/workout/${item.id}`} asChild>
                                           <TouchableOpacity className='w-[90%] mt-2 
                                                                        py-2 bg-dark-200 
                                                                        rounded-md border-2 
                                                                        border-[rgba(255,255,255,0.1)] 
                                                                        items-center self-center' 
                                                                        onLongPress={async()=>{await startSession(item.id)}}>
                                            <Text className='text-white text-2xl font-md'>{item.name}</Text>
                                           </TouchableOpacity>
                                          </Link>)}/>
        </>
       </View>
      </ScrollView>
     </SafeAreaView>
    </SafeAreaProvider>)}

export default Workouts;