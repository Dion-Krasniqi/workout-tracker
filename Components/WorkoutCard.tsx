import { WorkoutTemplate } from '@/interfaces/interfaces'
import { useSessionStore, useWorkoutStore } from '@/state/stateStore'
import { Link } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'


export const WorkoutCard = ({item}:{item:WorkoutTemplate}) => {
  const beginSession = useSessionStore((state)=>state.startSession);
  const getExerciseNumber = useWorkoutStore((state)=>state.loadExercises);
  const loadExercises = useSessionStore((state)=>state.loadActiveExercisesWithSets);
  const startSession = async (workout_id:number)=>{
    const sesh = await beginSession(workout_id);
    await loadExercises(workout_id, sesh.id)
  };
  const [number, setNumber] = useState(1)
  
  useEffect(()=>{
    async function setup (){
      const n = await getExerciseNumber(item.id);
      setNumber(n);
    }
    setup();
  },[item.id])
  
  return (
    <Link href={`/workout/${item.id}`} asChild>
        <TouchableOpacity className='w-[95%] mt-2 
                                     py-2 bg-dark-200 
                                     rounded-md border-2 
                                     border-[rgba(255,255,255,0.1)] 
                                     items-center self-center' 
                                     onLongPress={async()=>{await startSession(item.id)}}>
            <View style={{flex:1, flexDirection:'row', alignItems:'center', paddingVertical:10, paddingHorizontal:12}}>
                <Text className='text-white text-2xl font-md' 
                      style={{flex:1,alignItems:'flex-start'}}>{item.name}</Text>
                <Text className='text-light-100 text-lg font-md'>Exercises: {number}</Text>
            </View>
        </TouchableOpacity>
    </Link>
  )
}

export default WorkoutCard