import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { getSessionById } from '../db/queries';

const SessionDetails = () => {
  const {id} = useLocalSearchParams();
  const [session, setSession] = useState();
  useEffect(()=>{
    async function setup(){
            //@ts-ignore
            const result = await getSessionById(parseInt(id));
            console.log(result?.time_started)
          }
          setup();
        
  },[])
  return (
    <SafeAreaProvider>
            <SafeAreaView className='bg-dark-100' style={{flex: 1, alignItems: "center"}}>
      <Text className='text-white'>SessionDetails for {id}</Text>
    </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default SessionDetails



{/**/}