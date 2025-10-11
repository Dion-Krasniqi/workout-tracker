import { View, Text, TextInput, FlatList, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Session, SessionExercise, SessionSet} from '@/interfaces/interfaces';
import { useSessionStore } from '@/state/stateStore';
import { getAllNotes, getSetData } from '@/app/db/queries';


// renders sets in exercises
export const SetView = ({set}:{set:SessionSet}) => {
  const [weight, setWeight] = useState(set.weight);
  const [reps, setReps] = useState(Number(set.reps));
  const updateSet = useSessionStore((state)=>state.updateSet)
  useEffect(()=>{
    //calls useSessionStore updateSet when weight or reps changes in the text input
    updateSet(set.id,weight,reps);
  },[weight,reps])

  return (
      
      <View className='flex-row justify-around mt-2 items-center' >
        <Text className='text-light-100 text-xl mb-1'>Set {set.set_number}</Text>
        <View className='flex-row gap-5 justify-end'>
          <TextInput placeholder={(set.weight).toString()+' kg'}
                 keyboardType='numeric' 
                 onChangeText={(text)=>{setWeight(Number(text));}}
                 placeholderTextColor={'darkgrey'}
                 scrollEnabled={false}
                 className='text-start px-2 text-white border-2 border-light-100 rounded-md h-[40] w-[40%]'/>
          <TextInput placeholder={(set.reps).toString()}
                 keyboardType='numeric' 
                 onChangeText={(text)=>setReps(Number(text))}
                 placeholderTextColor={'darkgrey'}
                 scrollEnabled={false}
                 className='text-center px-2 text-white border-2 border-light-100 rounded-md h-[40] w-[20%]'/>
        </View>
      </View>
  
  )
}

// renders exercise in sessions
export const ExerciseView = ({exercise}:{exercise:SessionExercise}) => {
  const [notes, setNotes] = useState(exercise.notes);
  const updateNotes = useSessionStore((state)=>state.updateNotes)

  useEffect(()=>{
    //calls useSessionStore updateSet when weight or reps changes in the text input
    updateNotes(exercise.exercise_id,notes)
  },[notes])

  return (
    <View className='mb-5 px-7'>
      <View className='mt-5 mb-3'>
        <Text className='text-white font-semibold text-xl'>{exercise.name}</Text>
      </View>
      <View className='justify-center'>
        <FlatList data={exercise.sets}
                renderItem={(item)=>(<SetView set={item.item}/>)}
                contentContainerStyle={{margin:0}}/>
        <TextInput 
                 placeholder={notes}
                 onChangeText={(text)=>{setNotes(text)}}
                 placeholderTextColor={'darkgrey'}
                 scrollEnabled={false}
                 className='text-center px-2 text-white border-2 border-light-100 rounded-md h-[60] mt-5 w-[90%] self-center'/>
      </View>
    </View>
  )
}


// renders finished session
export const FinishedSessionView = ({sesh}:{sesh:Session}) =>{
  //@ts-ignore
  let seconds = (sesh.time_ended-sesh.time_started)/1000;
  const hours = Math.floor(seconds / 3600);
  seconds = seconds % 3600;
  const minutes = Math.floor(seconds/60)
  seconds = Math.round(seconds%60);
  const date = new Date(sesh.time_started).toLocaleTimeString([], {day: '2-digit', month: '2-digit', year: '2-digit'})
  
  const screenWidth = Dimensions.get("window").width/1.1;

  return (
      <View className='flex rounded-md h-[60] justify-center px-2 bg-white mt-4' style={{width:screenWidth}}>
        <View className='flex-row justify-between'>
          <Text className='font-bold text-center'>{sesh.session_name}</Text>
          <Text>{date}</Text>
        </View>
        <View className='items-start'>
          
          <Text className='font-bold text-center'>Duration: {hours}:{minutes}:{seconds}</Text>
        </View>
         
      </View>
              )

}