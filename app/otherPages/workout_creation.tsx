import CustomButton from '@/Components/button';
import { useWorkoutStore } from '@/state/stateStore';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const Workout_creation = () => {

  const router = useRouter();
  const [name, setName] = useState('');
  const addWorkout = useWorkoutStore((state)=>state.addWorkout);
  


  return (
   <SafeAreaProvider>
         <SafeAreaView className='bg-dark-100' style={{flex: 1, alignItems: "center"}}> 
            <TouchableOpacity className='self-start mt-5 px-5' onPress={()=>(router.back())}>
                                        <Image source={require('../../assets/icons/arrow.png')} style={{tintColor:'white', transform:[{scaleX:-1.2},{scaleY:1.2}]}}
                                        className='items-center'/>
            </TouchableOpacity>
            <View className="flex-1 items-center justify-center h-auto w-[80%]">
                <TextInput placeholder='Enter Workout Name' 
                   value={name} 
                   onChangeText={setName}
                   placeholderTextColor={'darkgrey'}
                   className='text-center text-light-100 bg-white rounded-md px-4 w-full mb-4'
                   style={{paddingVertical:30}}/>

                   {name.length>0 && (
                        <View className=''>
                            
                            <CustomButton buttonText='Create Workout' 
                                                   onPress={async ()=>{const resultId = await addWorkout(name);
                                                                       if(resultId==-2){
                                                                        return;
                                                                       }
                                                                       router.replace(`/workout/${resultId}`);}}/>
                        </View>)
                   } 
             </View>

         </SafeAreaView>
   </SafeAreaProvider>
  )
}

export default Workout_creation