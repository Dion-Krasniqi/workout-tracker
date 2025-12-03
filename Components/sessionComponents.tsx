import { exerciseStatic, session } from '@/constants/content';
import { Session, SessionExercise, SessionSet } from '@/interfaces/interfaces';
import { useSessionStore, useUserPreferences } from '@/state/stateStore';
import { formatDate } from '@/utils';
import { Link } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';

const Width = Dimensions.get("window").width;

// renders sets in exercises
export const SetView = ({set}:{set:SessionSet}) => {
  const { language } = useUserPreferences();
  const oldW = set.oldWeight;
  const oldR = Number(set.oldReps);
  const [weight, setWeight] = useState(set.weight);
  const [reps, setReps] = useState(Number(set.reps));
  const updateSet = useSessionStore((state)=>state.updateSet)

  const inputWidth = Width/6;

  useEffect(()=>{
    //calls useSessionStore updateSet when weight or reps changes in the text input
    updateSet(set.id,weight,reps);
  },[weight,reps])

  return (
      
     
       <View style={{flexDirection:'row', marginHorizontal:10,
                     marginTop:18, justifyContent:'space-between', 
                     alignItems:'center'}}>
        <View>
          <Text className='text-white text-xl self-center'
                style={{borderWidth:0.5, borderRadius:20, padding:8, textAlign:'center', borderColor:'rgba(255, 255, 255, 0.65)'}}>{set.set_number}</Text>
        </View>
        <TouchableOpacity onLongPress={async()=>{setWeight(oldW);setReps(oldR)}}>
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
          <View style={{flexDirection:'row', marginRight:15}}>
            <TextInput placeholder={(oldW).toString()}
                 value={weight ? String(weight) : ''}
                 keyboardType='numeric' 
                 onChangeText={(text)=>{setWeight(Number(text));}}
                 placeholderTextColor={'darkgrey'}
                 multiline={true}
                 scrollEnabled={false}
                 className='text-center text-white border-light-100 rounded-md h-[40] focus:border-white' 
                 style={{width:inputWidth, borderWidth:1}}/>
            <Text style={{marginLeft:4, color:'white',alignSelf:'center'}}>Kg</Text>
          </View>
          <View style={{flexDirection:'row', marginLeft:15}}>
            <TextInput placeholder={(oldR).toString()}
                 value={reps ? String(reps) : ''}
                 keyboardType='numeric' 
                 onChangeText={(text)=>setReps(Number(text))}
                 placeholderTextColor={'darkgrey'}
                 multiline
                 scrollEnabled={false}
                 className='text-center px-2 text-white border-2 border-light-100 rounded-md h-[40] focus:border-white' 
                 style={{width:inputWidth/1.5, borderWidth:1}}/>
            <Text style={{marginLeft:4, color:'white',alignSelf:'center'}}>{exerciseStatic.reps[language]}</Text>
          </View>
        </View>
        </TouchableOpacity>
      </View>
  
  )
}

// renders exercise in sessions
export const ExerciseView = ({exercise}:{exercise:SessionExercise}) => {
  const [notes, setNotes] = useState(exercise.notes);
  const [oldNotes, setOldNotes] = useState(exercise.oldNotes);
  const [resetted, setResetted] = useState(exercise.marked || false);
  const updateNotes = useSessionStore((state)=>state.updateNotes);
  const resetExercise = useSessionStore((state)=>state.resetExercise);
  const { language } = useUserPreferences();

  useEffect(()=>{
    updateNotes(exercise.exercise_id,notes)
  },[notes]);

  const inputWidth = Width;

  const markExercise = async()=> {;
    await resetExercise(exercise.exercise_id);
    setResetted(true);
  }

  return (
    <View className='rounded-lg bg-dark-300 mt-2' style={{borderWidth:0.5, borderColor:'rgba(255, 255, 255, 0.33)'}}>
    <View style={{flex:1,marginBottom:18, marginTop:15,paddingHorizontal:28}}>
      <View style={{width:'100%'}}>
        <Text className='text-white font-semibold text-xl'>{exercise.name}</Text>
      </View>
      <View style={{flex:1, justifyContent:'center'}}>
        <FlatList data={exercise.sets}
                renderItem={(item)=>(<View><SetView set={item.item}/></View>)}
                contentContainerStyle={{alignSelf:'center',alignItems:'center'}}/>
        <TextInput 
                 value={notes ? notes : ''}
                 placeholder={oldNotes}
                 onChangeText={(text)=>{setNotes(text)}}
                 placeholderTextColor={'darkgrey'}
                 scrollEnabled={false}
                 maxLength={250}
                 multiline
                 className='border-2 border-light-100 rounded-md focus:border-white'
                 style={{width:inputWidth*.85, textAlign:'center', alignSelf:'center', color:'white', height:80, marginTop:20}}/>
      </View>
      <Link style={{alignSelf:'flex-end',marginTop:8}} href={`/exercise/${exercise.exercise_id}`}>
        <Text className='text-white'>{exerciseStatic.stats[language]}</Text>
      </Link>
      <TouchableOpacity style={{alignSelf:'flex-end',marginTop:8}} onPress={markExercise} disabled={resetted}>
        <Text className='bg-white' style={{borderRadius:5, padding:4, 
                                           backgroundColor:resetted ? ('#2e2e2eff'):('white'),
                                           fontSize:resetted ? (10):(12)}}>
                                          {resetted ? (exerciseStatic.marked[language]):(exerciseStatic.reset[language])}</Text>
      </TouchableOpacity>
    </View>
   </View>
  )
}

export const FinishedSet = ({set}:{set:SessionSet}) => {
  const { language } = useUserPreferences();
  const oldW = set.oldWeight;
  const oldR = Number(set.oldReps);



  return (
      
       <View style={{flexDirection:'row', marginTop:15, justifyContent:'space-around', alignItems:'center', gap:10,
                      paddingVertical:5, paddingHorizontal:8}}
             className='bg-white rounded-md bg-white border-light-100'>

            <Text className='text-xl self-center font-bold'>{exerciseStatic.set[language]} {set.set_number}</Text>
            <Text className='text-center'>{oldW} Kg</Text>
            <Text className='text-center'>{oldR} {exerciseStatic.reps[language]}</Text>
  
      </View>
  )
}

export const FinishedExercise = ({exercise}:{exercise:SessionExercise}) => {
  const { language } = useUserPreferences();

  const notes = exercise.notes;

  const inputWidth = Width;
  return (
    <View style={{flex:1,marginBottom:10, marginTop:15,paddingHorizontal:28}}>
    
      <View style={{width:'100%'}}>
        <Text className='text-white font-semibold text-xl'>{exercise.name}</Text>
      </View>
      <View style={{flex:1,flexDirection:'row', justifyContent:'space-between', gap:'10',paddingBottom:20}}>
        <FlatList data={exercise.sets}
                renderItem={(item)=>(<View><FinishedSet set={item.item}/></View>)}
                contentContainerStyle={{alignSelf:'center',alignItems:'center'}}/>
        <Text className='border-2 border-light-100 rounded-md bg-white'
              style={{width:inputWidth*.4, 
                      textAlign:'center',
                      textAlignVertical:'center',
                      alignSelf:'center', 
                      height:'100%', 
                      marginTop:20,
                      }}>
          {notes=='Notes' ? (exerciseStatic.notes[language]):notes}
        </Text>
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
  const date = formatDate(sesh.time_started)
  const screenWidth = Dimensions.get("window").width/1.1;
  const { language } = useUserPreferences();

  const setPrevSession = useSessionStore((state)=>state.setPreviousSession);
  const loadExercises = useSessionStore((state)=>state.loadPreviousSession);
  //check
  const setSession = async(id:number)=> {
    const ses = await setPrevSession(id);
    await loadExercises(id);
  };

  return (
    <Link href={`/session/completed/${sesh.id}`} asChild>
      <TouchableOpacity className='flex rounded-md justify-center px-2 bg-white mt-4' 
                        style={{width:screenWidth, height:65}} 
                        onPress={async()=>{await setSession(Number(sesh.id))}}>
        <View className='flex-row justify-between'>
          <Text className='font-bold text-center'>{sesh.session_name}</Text>
          <Text>{date}</Text>
        </View>
        <View className='items-start'>
          
          <Text className='font-bold text-center'>{session.duration[language]}: {hours}:{minutes}:{seconds}</Text>
        </View>
         
      </TouchableOpacity>
      </Link>
              )

}

export const Stopwatch = ({session}:{session?:Session | null}) => {
    const { language } = useUserPreferences();
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);
    const [bg,setBg] = useState('#fff');
    const updateTimer = useSessionStore((state)=>state.updateTimer);
    const control = useSessionStore();

    const intervalRef = useRef(null);
    const startTimeRef =(useRef(control.activeSession?.timer));
    
    const startStopwatch = () => {

      startTimeRef.current = (control.activeSession?.timer == 0) ? (Date.now() - time*1000):(startTimeRef.current);
      updateTimer(startTimeRef.current, true);
      intervalRef.current = setInterval(()=>{
        setTime(Math.floor((Date.now()-startTimeRef.current)/1000));
      },1000)

      setRunning(true);
      setBg('#baffa7ff')

    }

    const pauseStopwatch = () => {
      clearInterval(intervalRef.current);
      updateTimer(0, false);
      setRunning(false);
      setBg('#ff9b9bff')
    }

    const resetStopwatch = () => {
      clearInterval(intervalRef.current);
      updateTimer(0, false);
      setTime(0);
      setRunning(false);
      setBg('#fff')
    }

    const resumeStopWatch = () => {
      updateTimer(startTimeRef.current, true);
      intervalRef.current = setInterval(()=>{
        setTime(Math.floor((Date.now()-startTimeRef.current)/1000));
      },1000)
      setRunning(true);
      setBg('#baffa7ff')
    }
    
    const formatWatch = (seconds:number) => {
    const minutes = Math.floor(seconds/60);
    const sec = seconds%60;
    return `${String(minutes).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;      
  }
    useEffect(()=>{
      if (control.activeSession?.running){
        resumeStopWatch();
      }
    },[])

    return(
      <View style={{flex:1,flexDirection:'row',marginTop:10, marginBottom:50}}>
                      <TouchableOpacity style={{borderRadius:5, height:50, backgroundColor:bg, justifyContent:'center', width:'66%'}}
                                        onPress={()=>{if(!running){startStopwatch()}else{pauseStopwatch()}}}
                                        onLongPress={()=>resumeStopWatch()}>
                          <Text className='font-bold text-center'>{formatWatch(time)}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={{marginLeft:7,borderRadius:5, height:50, backgroundColor:'white', justifyContent:'center', width:'32%'}}
                                        onPress={resetStopwatch}>
                          <Text className='font-bold text-center'>{exerciseStatic.stopwatch[language]}</Text>
                      </TouchableOpacity>
       </View>
    )
    


}