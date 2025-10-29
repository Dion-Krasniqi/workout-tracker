import CustomButton from '@/Components/button';
import { FinishedExercise } from '@/Components/sessionComponents';
import { Session } from '@/interfaces/interfaces';
import { useSessionStore } from '@/state/stateStore';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


const deleteSession = () => {
  console.log('deleted');
}


const SessionDetails = () => {

    const {id} = useLocalSearchParams();
    const router = useRouter();
    const { previousSessions } = useSessionStore();
    const [session,setSession] = useState<Session>();
    const loadExercises = useSessionStore((state)=>state.loadPreviousSession);

    useEffect(()=>{
        setSession(previousSessions.find((s)=>s.id==Number(id)));
    },[]);
    
    let startTime = '';
    let endTime = '';

    if (session){

      startTime = new Date(session?.time_started).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      endTime = new Date(session?.time_ended!).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      loadExercises(session?.id);
    }


    return(
        <SafeAreaProvider>
            <SafeAreaView className='bg-dark-100 ' style={{flex: 1}}>
                <View  className='flex border-b-4 border-b-light-100 pb-5 rounded-xl'>
                  <View className="mx-2 px-5 mt-2">
                    <View className='flex-row justify-between mb-5 items-center'>
                
                      <TouchableOpacity className='items-center' onPress={()=>(router.push('/(tabs)'))}>
                        <Image source={require('../../../assets/icons/arrow.png')} 
                               style={{tintColor:'white', transform:[{scaleX:-1.2},{scaleY:1.2}]}}
                               className='items-center'/>
                      </TouchableOpacity>
                    </View>
                    <View className='rounded-md h-[50] justify-center px-2 bg-white'>
                      <Text className='font-bold text-center'>{session?.session_name}</Text>             
                    </View>
                    <View className='flex-row justify-between mt-3'>
                      <View className=' rounded-md h-[50] justify-center px-2 bg-white w-[49%]'>
                        <Text className='font-bold text-center'>Started at: {startTime}</Text>
                      </View>
                      <View className=' rounded-md h-[50] justify-center px-2 bg-white w-[49%] '>
                        <Text className='font-bold text-center'>Ended at: {endTime}</Text>
                      </View>       
                    </View>
                
                   </View>
                </View>
                <View>
                  <>
                    {session?.exercises && 
                      <FlatList data={session.exercises}
                                keyExtractor={(item)=>item.id.toString()}
                                renderItem={({item})=>(<View className='rounded-lg bg-dark-200 mb-2'>
                                                          <FinishedExercise exercise={item}/>
                                                       </View>)}
                                contentContainerStyle={{paddingBottom:120}}
                                ListFooterComponent={<View className='mb-24 mt-16 w-full'>
                                                        <CustomButton buttonText='Delete Session' onPress={()=>deleteSession()}/>
                                                      </View>}/>
                    }
                  </>
                </View>
                
                
            </SafeAreaView>
        </SafeAreaProvider>
    )
  
}

export default SessionDetails



