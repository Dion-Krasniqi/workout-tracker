import CustomButton from '@/Components/button';
import { FinishedExercise } from '@/Components/sessionComponents';
import { SessionHeaderComponent } from '@/Components/SessionHeaderComponent';
import { useSessionStore } from '@/state/stateStore';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Image, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const SessionDetails = () => {

    const {id} = useLocalSearchParams();
    const router = useRouter();
    const deleteSession = useSessionStore((state)=>state.deletePreviousSession);
    const [loading, setLoading] = useState(false);
    const { finishedSession } = useSessionStore();

    useEffect(()=>{},[]);

    let startTime = '';
    let endTime = '';

    if (finishedSession){
      startTime = new Date(finishedSession?.time_started).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      endTime = new Date(finishedSession?.time_ended!).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    const DeleteButton = ()=> {
      return (
        <View className='mb-24 mt-16 w-full'>
         <CustomButton buttonText='Delete Session' 
                       onPress={()=>{if(finishedSession)
                        {Alert.alert('Session information will be lost',
                                     'Do you wish to proceed?',
                                    [{text: 'Cancel',onPress: () => {},style: 'cancel',},
                                     { text: 'YES', onPress: async() => {await deleteSession(Number(id));
                                                                         router.replace('/(tabs)')}},
                                    ],
                                     { cancelable: false });}}}/>
        </View>)
    }

    return(
        <SafeAreaProvider>
         <SafeAreaView className='bg-dark-100 ' style={{flex: 1}}>
          {loading ? 
           (<ActivityIndicator size="large" className="flex-1 justify-center" color="#fff"/>) :
           (<View>
             <View  className='flex border-b-4 border-b-light-100 pb-5 rounded-xl'>
              <View className="mx-2 px-5 mt-2">
               <View className='flex-row justify-between mb-5 items-center'>
                <TouchableOpacity className='items-center' onPress={()=>(router.push('/(tabs)'))}>
                 <Image source={require('../../../assets/icons/arrow.png')} 
                        style={{alignItems:'center',tintColor:'white', transform:[{scaleX:-1.2},{scaleY:1.2}]}}/>
                </TouchableOpacity>
               </View>
               <SessionHeaderComponent text= {finishedSession?.session_name || ''} />
               <View className='flex-row justify-between mt-3'>
                <SessionHeaderComponent text={`Exercises: ${startTime}`} width={49}/>
                <SessionHeaderComponent text={`Exercises: ${endTime}`} width={49}/>
               </View>
              </View>
             </View>
             <View>
              <>
               {finishedSession?.exercises && 
                 <FlatList data={finishedSession.exercises}
                           keyExtractor={(item)=>item.id.toString()}
                           renderItem={({item})=>(<FinishedExercise exercise={item}/>)}
                           contentContainerStyle={{paddingBottom:120}}
                           ListFooterComponent={<DeleteButton />}/>
               }
              </>
             </View>
            </View>)}   
           </SafeAreaView>
          </SafeAreaProvider>)
}

export default SessionDetails