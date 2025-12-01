import { WorkoutTemplate } from '@/interfaces/interfaces'
import { useSessionStore, useWorkoutStore } from '@/state/stateStore'
import { Link } from 'expo-router'
import { useState } from 'react'
import { Text, TouchableOpacity } from 'react-native'


export const WorkoutCard = ({item}:{item:WorkoutTemplate}) => {
  const beginSession = useSessionStore((state)=>state.startSession);
  const getExerciseNumber = useWorkoutStore((state)=>state.loadExercises);
  const loadExercises = useSessionStore((state)=>state.loadActiveExercisesWithSets);
  const startSession = async (workout_id:number)=>{
    const sesh = await beginSession(workout_id);
    await loadExercises(workout_id, sesh.id)
  };
  const [number, setNumber] = useState(1)
  
  
  return (
    <Link href={`/workout/${item.id}`} asChild>
        <TouchableOpacity className='bg-dark-200 rounded-md border-2' 
                          style={{justifyContent:'center', 
                                  alignItems:'center', 
                                  paddingVertical:18, 
                                  width:'95%', 
                                  marginBottom:10,
                                  borderColor:'rgba(255,255,255,0.1)',
                                  alignSelf:'center'}}
                          onLongPress={async()=>{await startSession(item.id)}}>
                <Text className='text-white text-2xl font-medium'>{item.name}</Text>
        </TouchableOpacity>
    </Link>
  )
}

export default WorkoutCard