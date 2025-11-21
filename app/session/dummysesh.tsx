// This is the active session page, not gonna rename it bcuz routing is being weird

import CustomButton from '@/Components/button';
import { ExerciseView, Stopwatch } from '@/Components/sessionComponents';
import { SessionHeaderComponent } from '@/Components/SessionHeaderComponent';
import { useSessionStore, useUserPreferences } from '@/state/stateStore';
//import ThemeHandler from '@/utils/ThemeHandler';
import { general, session } from '@/constants/content';
import { getSystemTheme } from '@/utils/ThemeHandler';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { getAllNotes } from '../db/queries';

const Exercise_creation = () => {
  const router = useRouter();
  const endSession = useSessionStore((state)=>state.endSession);
  const quitSession = useSessionStore((state)=>state.quitSession);
  const loadExercises = useSessionStore((state)=>state.loadActiveExercisesWithSets);
  
  const {activeSession, loading, sessionMarked} = useSessionStore();

  const { systemTheme, language } = useUserPreferences();
  const [color, setColor] = useState('white');

  const [elapsed,setElapsed] = useState(0);
  const sessionTime = activeSession?.time_started || Date.now();
  
  useEffect(()=>{
    //@ts-ignore
    if (activeSession?.exercises.length<1){
      //@ts-ignore
      loadExercises(activeSession?.workout_id,activeSession?.id)
      getAllNotes();
    }
  },[]);

  useEffect(()=>{
    if(systemTheme=='default'){
      setColor(' bg-black')
    }else{
      setColor(' bg-white')
    }
  }, [getSystemTheme]);

  useEffect(()=>{
    const interval = setInterval(()=>{
      setElapsed(Date.now()-sessionTime)
    },1000);
    return ()=>clearInterval(interval);
  },[sessionTime]);

  const formatWatch = (milliseconds:number) => {
    const totalSeconds = Math.floor(milliseconds/1000);
    const hours = Math.floor(totalSeconds/3600);
    const minutes = Math.floor((totalSeconds%3600)/60);
    const seconds = (totalSeconds % 3600)%60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  }

  const resetExercises = ()=> {
    if(activeSession?.exercises && sessionMarked==false){
      // this should mark only unmarked exercises
      const updatedExercises = activeSession.exercises.map((ex)=>((ex.marked? (!ex.marked):(1)) ) ? {...ex,marked:true} : ex);
      useSessionStore.setState({activeSession:{...activeSession, exercises:updatedExercises}});
      useSessionStore.setState({sessionMarked:true});
      // find a better way to do this
      router.replace('/session/dummysesh');
    }
  }

  const QuitButton = ()=> {
    return (
      <CustomButton buttonText={session.quit[language]} style={`bg-${color}`} 
                    onPress={()=>{if(activeSession)
                      {Alert.alert(session.quitMessage[language], general.alertQuestion[language],
                                   [{text: general.alertCancel[language],onPress: () => {},style: 'cancel',},
                                    { text: general.alertYes[language], onPress: async() => {await quitSession();
                                                                        router.replace('/(tabs)')}},
                                   ],
                                    { cancelable: false })}}}/>
    )
  }

  const RestButton = ()=> {
    return (
      <CustomButton buttonText={session.reset[language]} style={`bg-${color} mt-8 py-2`} 
                    onPress={()=>{if(activeSession)
                      {Alert.alert(session.resetMessage[language],general.alertQuestion[language],
                                   [{text: general.alertCancel[language], onPress: () => {},style: 'cancel',},
                                    { text: general.alertYes[language], onPress: async() => {await resetExercises();
                                    }},
                                   ],
                                    { cancelable: false })}}}/>
    )
  }

  //@ts-ignore
  const time = new Date(sessionTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  return (
    <SafeAreaProvider>
     {loading ? 
      (<ActivityIndicator/>):
      (<SafeAreaView className='flex-1 bg-[#0d121bff]'>
        <View  className='flex border-b-4 border-b-light-100 pb-5 rounded-xl'>
         <View className="mx-2 px-5 mt-2">
          <View className='flex-row justify-between mb-5 items-center'>
           <TouchableOpacity className='items-center' onPress={()=>(router.push('/(tabs)'))}>
            <Image source={require('../../assets/icons/arrow.png')} style={{tintColor:'white', transform:[{scaleX:-1.2},{scaleY:1.2}]}}
                   className='items-center'/>
           </TouchableOpacity>
           <CustomButton buttonText={session.finish[language]} onPress={()=>{endSession();router.push('/(tabs)')}}/>
          </View>
          <SessionHeaderComponent text={`${activeSession?.session_name}`}/>
          <View className='flex-row justify-between mt-3'>
           <SessionHeaderComponent text={`${session.exercises[language]}: ${activeSession?.exercises.length}`} width={32}/>
           <SessionHeaderComponent text={`${session.sets[language]}: ${activeSession?.setNumber}`} width={32}/>
           <SessionHeaderComponent text={`${session.startedAt[language]} ${time}`} width={32}/>
          </View>
          <View>
           <Stopwatch />
          </View>
         </View>
        </View>
      <View className="mx-2"style={{backgroundColor:systemTheme=='default' ? 'white' : '#111823'}}>
       <FlatList 
                data={activeSession?.exercises} keyExtractor={(item)=>item.id.toString()}
                renderItem={({item})=>(<ExerciseView exercise={item}/>)}
                contentContainerStyle={{paddingBottom:120}}
                ListFooterComponent={<View className='self-center mb-44 mt-5 items-center'>
                                      <Text className='font-bold text-4xl mb-7' style={{color:systemTheme=='default' ? 'black' : 'white'}}>{formatWatch(elapsed)}</Text>
                                      <QuitButton />
                                      {sessionMarked==false ? 
                                      (<RestButton />):
                                      (<Text className='text-light-100 mt-4'>{session.resetDisclaimer[language]}</Text>)}
                                     </View>} />
      </View>
    </SafeAreaView>)}
   </SafeAreaProvider>)
}

export default Exercise_creation