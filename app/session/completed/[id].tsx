import { Session } from '@/interfaces/interfaces';
import { useSessionStore } from '@/state/stateStore';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


const SessionDetails = () => {

    const {id} = useLocalSearchParams();
    const router = useRouter();
    const { previousSessions } = useSessionStore();
    const [session,setSession] = useState<Session>();

    useEffect(()=>{
        setSession(previousSessions.find((s)=>s.id==Number(id)));

    },[]);

    const startTime = new Date(session?.time_started).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    const endTime = new Date(session?.time_ended).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })


    return(
        <SafeAreaProvider>
            <SafeAreaView className='bg-dark-100 ' style={{flex: 1}}>
                <View  className='flex border-b-4 border-b-light-100 pb-5 rounded-xl'>
                         
                         <View className="mx-2 px-5 mt-2">
                <View className='flex-row justify-between mb-5 items-center'>
                
                <TouchableOpacity className='items-center' onPress={()=>(router.push('/(tabs)'))}>
                  <Image source={require('../../../assets/icons/arrow.png')} style={{tintColor:'white', transform:[{scaleX:-1.2},{scaleY:1.2}]}}
                  className='items-center'/>
                 </TouchableOpacity>
                {/*<Text className='text-light-100'>Ended at 01:30</Text>*/}
            </View>
             <View className=' rounded-md h-[50] justify-center px-2 bg-white'>
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
                
            </SafeAreaView>
        </SafeAreaProvider>
    )
  
}

export default SessionDetails



