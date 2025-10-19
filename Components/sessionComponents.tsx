import { Session, SessionExercise, SessionSet } from '@/interfaces/interfaces';
import { useSessionStore } from '@/state/stateStore';
import { Link } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';

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
      
     <TouchableOpacity onLongPress={async()=>{setWeight(oldW);setReps(oldR)}}>
       <View className='flex-row justify-around mt-2 items-center w-full'>
        <View>
          <Text className='text-white text-xl self-center'>Set {set.set_number}</Text>
        </View>
        <View className='flex-row justify-between'>
          <View className='flex-row'>
            <TextInput placeholder={(oldW).toString()}
                 value={weight ? String(weight) : ''}
                 keyboardType='numeric' 
                 onChangeText={(text)=>{setWeight(Number(text));}}
                 placeholderTextColor={'darkgrey'}
                 scrollEnabled={false}
                 className='text-center text-white border-2 border-light-100 rounded-md h-[40] focus:border-white' style={{width:inputWidth}}/>
          <Text className='ml-2 text-white self-center'>Kg</Text>
          </View>
          <View className='flex-row ml-5'>
            <TextInput placeholder={(oldR).toString()}
                 value={reps ? String(reps) : ''}
                 keyboardType='numeric' 
                 onChangeText={(text)=>setReps(Number(text))}
                 placeholderTextColor={'darkgrey'}
                 scrollEnabled={false}
                 className='text-center px-2 text-white border-2 border-light-100 rounded-md h-[40] focus:border-white' style={{width:inputWidth/1.5}}/>
            <Text className='ml-2 text-white self-center '>Reps</Text>
          </View>
        </View>
      </View>
     </TouchableOpacity>
  
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
    <View className='flex mb-5 px-7 mt-5'>
      {/*width */}
      <View className='w-full'>
        <Text className='text-white font-semibold text-xl'>{exercise.name}</Text>
      </View>
      {/*flex implementation */}
      <View className='flex justify-center mt-5'>
        <FlatList data={exercise.sets}
                renderItem={(item)=>(<View><SetView set={item.item}/></View>)}
                contentContainerClassName='self-center items-center'/>
        <TextInput 
                 placeholder={notes}
                 onChangeText={(text)=>{setNotes(text)}}
                 placeholderTextColor={'darkgrey'}
                 scrollEnabled={false}
                 maxLength={250}
                 multiline
                 className='text-center px-2 text-white border-2 border-light-100 rounded-md h-[80] mt-5 self-center hover:border-white'
                 style={{width:inputWidth*.85}}/>
      </View>
      {/*Css */}
      <Link style={{alignSelf:'flex-end',marginTop:8}} href={`/exercise/${exercise.exercise_id}`}>
        <Text className='text-white'>Stats</Text>
      </Link>
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

export const Stopwatch = () => {
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);

    const intervalRef = useRef(null);
    const startTimeRef = useRef(0);

    const startStopwatch = () => {
      startTimeRef.current = Date.now() - time*1000;

      intervalRef.current = setInterval(()=>{
        setTime(Math.floor((Date.now()-startTimeRef.current)/1000));
      },1000)

      setRunning(true);

    }

    const pauseStopwatch = () => {
      clearInterval(intervalRef.current);
      setRunning(false);
    }

    const resetStopwatch = () => {
      clearInterval(intervalRef.current);
      setTime(0);
      setRunning(false);
    }

    const resumeStopWatch = () => {
      startTimeRef.current = Date.now() - time*1000;
      intervalRef.current = setInterval(()=>{
        setTime(Math.floor((Date.now()-startTimeRef.current)/1000));
      },1000)

      setRunning(true);
    }
    
    const formatWatch = (seconds:number) => {
    const minutes = Math.floor(seconds/60);
    const sec = seconds%60;
    return `${String(minutes).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;

  }

    return(
      <View className='flex flex-row justify-between mt-3 w-full'>
                      <TouchableOpacity className=' rounded-md h-[50] justify-center bg-white w-[66%]'
                                        onPress={()=>pauseStopwatch()}
                                        onLongPress={()=>startStopwatch()}>
                          <Text className='font-bold text-center'>{formatWatch(time)}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity className=' rounded-md h-[50] justify-center bg-white w-[32%]'
                                        onPress={resetStopwatch}>
                          <Text className='font-bold text-center'>Reset Stopwatch</Text>
                      </TouchableOpacity>
       </View>
    )
    


}
