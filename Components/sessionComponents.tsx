import { Session, SessionExercise, SessionSet } from '@/interfaces/interfaces';
import { useSessionStore } from '@/state/stateStore';
import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Text, TextInput, View } from 'react-native';

const Width = Dimensions.get("window").width;
// renders sets in exercises
export const SetView = ({set}:{set:SessionSet}) => {
  const [oldW, setOldW] = useState(set.weight);
  const [oldR, setOldR] = useState(Number(set.reps));
  const [weight, setWeight] = useState(set.weight);
  const [reps, setReps] = useState(Number(set.reps));
  const updateSet = useSessionStore((state)=>state.updateSet)

  const inputWidth = Width/6;

  useEffect(()=>{
    //calls useSessionStore updateSet when weight or reps changes in the text input
    updateSet(set.id,weight,reps);
  },[weight,reps])

  return (
      
      <View className='flex-row justify-around mt-2 items-center' >
        <View><Text className='text-white text-xl self-center'>Set {set.set_number}</Text></View>
        <View className='flex-row justify-between'>
          <View className='flex-row'>
            <TextInput placeholder={(oldW).toString()}
                 
                 keyboardType='numeric' 
                 onChangeText={(text)=>{setWeight(Number(text));}}
                 placeholderTextColor={'darkgrey'}
                 scrollEnabled={false}
                 className='text-center text-white border-2 border-light-100 rounded-md h-[40]' style={{width:inputWidth}}/>
          <Text className='ml-2 text-white self-center'>Kg</Text>
          </View>
          <View className='flex-row ml-5'>
            <TextInput placeholder={(oldR).toString()}
                 keyboardType='numeric' 
                 onChangeText={(text)=>setReps(Number(text))}
                 placeholderTextColor={'darkgrey'}
                 scrollEnabled={false}
                 className='text-center px-2 text-white border-2 border-light-100 rounded-md h-[40]' style={{width:inputWidth/1.5}}/>
            <Text className='ml-2 text-white self-center '>Reps</Text>
          </View>
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
  const inputWidth = Width;
  return (
    <View className='mb-5 px-7 mt-5'>
      <View className=''>
        <Text className='text-white font-semibold text-xl'>{exercise.name}</Text>
      </View>
      <View className='justify-center mt-5'>
        <FlatList data={exercise.sets}
                renderItem={(item)=>(<SetView set={item.item}/>)}
                contentContainerStyle={{margin:0}}/>
        <TextInput 
                 placeholder={notes}
                 onChangeText={(text)=>{setNotes(text)}}
                 placeholderTextColor={'darkgrey'}
                 scrollEnabled={false}
                 maxLength={250}
                 multiline
                 className='text-center px-2 text-white border-2 border-light-100 rounded-md h-[80] mt-5 self-center'
                 style={{width:inputWidth*.85}}/>
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
