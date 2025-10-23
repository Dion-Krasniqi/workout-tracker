import { ExerciseInfo } from '@/interfaces/interfaces';
import { Link, useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';



// links to exercise info
export const NameCardExec = ({id, name}: ExerciseInfo) => {
  return (
    
    <Link href={`/exercise/${id}`} asChild>
      <TouchableOpacity className='w-[90%] mt-2 py-2 bg-dark-200 rounded-md border-2 border-[rgba(255,255,255,0.05)] items-center self-center' >
      <Text className='text-white text-2xl font-md'>{name}</Text>
    </TouchableOpacity>
    </Link>
  
  )
}

//exericse info instance for selected workout
type test = ExerciseInfo & {
    workout_id:number;
  }
//links to the adding page which creates the instance with the entered set number(in this linked page)
export const NameCardExecAdd = ({id,name,workout_id}:test) => {
  const router = useRouter();
  
  return (
    
    
    <TouchableOpacity className='w-[90%] mt-2 bg-dark-200 rounded-md border-2 border-[rgba(255,255,255,0.05)] items-center self-center' 
    //@ts-ignore
    style={{paddingVertical:10}}
    onPress={()=>router.push({pathname:`/exercise_add/${id}`,
                              params:{workout_id:workout_id}})}>
      <Text className='text-white text-2xl font-md'>{name}</Text>
    </TouchableOpacity>
    
  
  )
}


// workout info
export const NameCardWork = ({id, name}:{id:number,name:string}) => {
  return (
    
    <Link href={`/workout/${id}`} asChild>
      <TouchableOpacity className='w-[90%] mt-2 py-2 bg-light-100 rounded-md items-center self-center' >
      <Text className='text-white text-2xl font-md'>{name}</Text>
    </TouchableOpacity>
    </Link>
  
  )
}
