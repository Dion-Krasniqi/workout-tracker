// This is the active session page, not gonna rename it bcuz routing is being weird

import CustomButton from '@/Components/button';
import { ExerciseView } from '@/Components/sessionComponents';
import { useSessionStore } from '@/state/stateStore';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Image, Text, TouchableOpacity, View, } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { getAllNotes } from '../db/queries';

const Exercise_creation = () => {

  const router = useRouter();
  const beginSession = useSessionStore((state)=>state.startSession);
  const endSession = useSessionStore((state)=>state.endSession);
  const quitSession = useSessionStore((state)=>state.quitSession);
  const loadExercises = useSessionStore((state)=>state.loadExercisesWithSets);
  const {activeSession, loading} = useSessionStore();

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

  //@ts-ignore
  const time = new Date(sessionTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  return (
    <SafeAreaProvider>
      <SafeAreaView className='bg-dark-100 ' style={{flex: 1}}> 
        <View  className='border-b-4 border-b-light-100 pb-5 rounded-xl'>
         
         <View className="mx-2 px-5 mt-2">
          <View className='flex-row justify-between mb-5 items-center'>
                
                <TouchableOpacity className='items-center' onPress={()=>(router.push('/(tabs)'))}>
                  <Image source={require('../../assets/icons/arrow.png')} style={{tintColor:'white', transform:[{scaleX:-1.2},{scaleY:1.2}]}}
                  className='items-center'/>
                 </TouchableOpacity>
                {/*<Text className='text-light-100'>Ended at 01:30</Text>*/}
                <CustomButton buttonText='Finish' onPress={()=>{endSession();router.push('/(tabs)')}}/>
            </View>
          
          
            
            <View className=' rounded-md h-[50] justify-center px-2 bg-white'>
                <Text className='font-bold text-center'>{activeSession?.session_name}</Text>
            </View>
            <View className='flex-row justify-between mt-3'>
                <View className=' rounded-md h-[50] justify-center px-2 bg-white w-[32%]'>
                  <Text className='font-bold text-center'>Exercises: {activeSession?.exercises.length}</Text>
                </View>
                <View className=' rounded-md h-[50] justify-center px-2 bg-white w-[32%] '>
                  <Text className='font-bold text-center'>Sets: {activeSession?.setNumber}</Text>
                </View>
                <View className=' rounded-md h-[50] justify-center px-2 bg-white w-[32%] '>
                  <Text className='font-bold text-center'>Started at {time}</Text>
                </View>
            </View>
            <View className='flex-row justify-between mt-3'>
                <TouchableOpacity className=' rounded-md h-[50] justify-center px-2 bg-white w-[49%]'>
                    <Text className='font-bold text-center'>00:00</Text>
                </TouchableOpacity>
                <TouchableOpacity className=' rounded-md h-[50] justify-center px-2 bg-white w-[49%] '>
                    <Text className='font-bold text-center'>Reset Stopwatch</Text>
                </TouchableOpacity>
            </View>
         </View>
        </View>

      <View className="mx-2">

       <FlatList data={activeSession?.exercises}
                 keyExtractor={(item)=>item.id.toString()}
                 renderItem={({item})=>(<View className='rounded-lg bg-dark-200 mb-2'>
                                          <ExerciseView exercise={item}/>
                                        </View>)}
                 contentContainerStyle={{paddingBottom:120}}
                 ListFooterComponent={<View className='self-center mb-44'>
                                        <Text className='text-white font-bold text-4xl mb-7'>{formatWatch(elapsed)}</Text>
                                        <CustomButton buttonText='Quit Session' onPress={()=>{
                                          if(activeSession){
                                                      Alert.alert('Session information will be lost','Do you wish to proceed?',
                                                      [{text: 'Cancel',onPress: () => {},style: 'cancel',},
                                                      { text: 'YES', onPress: 
                                                        async() => {await quitSession();
                                                                    router.replace('/(tabs)')}},],
                                                      { cancelable: false });}}}/>
                                      </View>}
                 />
      
        
        
      </View>
      
        
      
      
      
      
    </SafeAreaView>

    </SafeAreaProvider>
    
  );
}

export default Exercise_creation