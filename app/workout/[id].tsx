import CustomButton from '@/Components/button';
import { useSessionStore, useWorkoutStore } from '@/state/stateStore';
import { Height } from '@/utils';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, LayoutAnimation, Modal, Platform, Text, TextInput, TouchableOpacity, UIManager, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';








const WorkoutInformation = () => {
  if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  const [direction, setDirection] = useState('column');
  const { id } = useLocalSearchParams();
  const {workouts, loading} = useWorkoutStore();
  const workout = workouts.find((w) => w.id === Number(id));
  const [name, setName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [setNumber,setSetNumber] = useState(0);
  const [exerciseid, setExerciseId] = useState(-1);

  const beginSession = useSessionStore((state)=>state.startSession);
  const deleteExercise = useWorkoutStore((state)=>state.removeExerciseFromWorkout);
  const changeOrder = useWorkoutStore((state)=>state.changeOrder);
  const changeName = useWorkoutStore((state)=>state.changeName);
  const changeSetNumber = useWorkoutStore((state)=>state.changeSetNumber)

  const updateSetNumber = async(exercise_id:number,setNumber:number,workout_id:number) => {
    if (exercise_id == -1){
      setModalVisible(false);
      return
    }
    if (setNumber==0){
      await deleteExercise(workout_id,exercise_id);
    }
    await changeSetNumber(workout_id,exercise_id,setNumber);
    setExerciseId(-1);
    //aaaa
    router.replace(`/workout/${id}`);
  }

  const toggleLayout = () => {
    // Not working
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setDirection((prev) => (prev === 'row' ? 'column' : 'row'));
  };

  const changeWorkoutName = async (name:string,old_name:string) => {
    if(name==old_name){
      alert('Name is the same!');
    }
    if(name.trim() == ''){
      alert('Name is empty!')
    }
    changeName(Number(id),name);
  } 

  if(loading){
    return(<Text>Loading Workouts</Text>)
  }
  if (!workout) {
    return(<Text>Workout not found</Text>)
  }

  const router = useRouter();
  
  useEffect(()=>{
    if (workout){
      useWorkoutStore.getState().loadExercises(workout.id);
    }
  },[workout?.id])

  const renderModal = ()=> {
    return (
      <Modal animationType="slide" transparent={true} visible={modalVisible}
             onRequestClose={() => {setModalVisible(!modalVisible)}}>

          <View style={{ margin: 70, marginTop:Height*.33, backgroundColor: 'white',
                         borderRadius: 5, padding: 15, shadowColor: '#000',
                         shadowOffset: {width: 0, height: 2,}, shadowOpacity: 0.25, shadowRadius: 4,}}>
            <View className='flex-row items-center justify-between'>
              <Text >Change Number of Sets</Text>
              <TextInput value={setNumber>0 ? String(setNumber):''} 
                       onChangeText={(text)=>setSetNumber(Number(text))}
                       keyboardType='numeric'
                       className='text-black border-2 border-light-100 px-4 rounded-md py-1'/>
            </View>
            <View className='flex-row justify-between mt-10'>
              <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                <Text>Return</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={async()=>{try{await updateSetNumber(exerciseid,setNumber,Number(id));
                                      } catch(error){console.log(error);
                                      } finally {setModalVisible(false);}}}>
                  <Text>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
    )
  }



  return (
    <SafeAreaProvider>
         <SafeAreaView className='bg-dark-100' style={{flex: 1, alignItems: "center"}}> 
            {renderModal()}
            <View className="items-center mt-10 w-[80%] flex flex-row">
                <TextInput placeholder={workout.name} 
                   onChangeText={(text)=>{setName(text);
                                          if(text?.length>0 && direction=='column' && text != workout.name){
                                            toggleLayout();
                                          }
                                          if(text?.length==0 && direction=='row'){
                                            toggleLayout();
                                          }

                   }}
                   placeholderTextColor={'darkgrey'}
                   className='text-center text-light-100 bg-white rounded-md px-4'
                   style={{width: (direction=='row') ? '90%':'100%'}}/>
                {(direction=='row') && (
                  <TouchableOpacity className='ml-2 bg-white py-2 items-center rounded-r-md h-auto ' 
                                    style={{width:(direction=='row')? '12%':'5%',
                                    borderRadius: (direction=='row')? 5:0}}
                                    //for now just hard replace but just figure out a way to empty text
                                    onPress={()=>{changeWorkoutName(name,workout.name); 
                                                  router.replace(`/workout/${id}`);
                                    }}>
                    <Text className='items-center'>✓</Text>
                  </TouchableOpacity>
                )}

            
             </View>
             <FlatList data={workout.exercises}
                       renderItem={({item})=>(<TouchableOpacity onPress={async()=>{setSetNumber(item.set_number);setExerciseId(item.id);setModalVisible(true)}} onLongPress={()=>deleteExercise(workout.id,item.id)}>
                        <View className='flex flex-row self-center w-[90%] mt-2 py-4 px-4 bg-dark-200 rounded-md border-2 border-[rgba(255,255,255,0.05)] items-center justify-between'>
                                                
                                                
                                                  <View className='flex flex-cols'>
                                                      <Text className='text-white text-lg font-bold'>{item.name}</Text>
                                                      <Text className='text-white mr-10'>{item.set_number} Sets</Text>
                                                  </View>
                                                  
                                                  <View className='flex flex-row gap-4'>
                                                    {(item.order_index==workout.exercises.length ) && (<Text className='mr-2'></Text>)}
                                                    {item.order_index>1 && (<TouchableOpacity onPress={()=>
                                                      {changeOrder(Number(id),item.id,item.order_index-1, item.order_index)}}>
                                                      <Text className='text-white font-bold ' style={{transform:[{scale:2}]}}>⇑</Text>
                                                    </TouchableOpacity>)}
                                                    
                                                    
                                                    {(item.order_index<workout.exercises.length ) && (<TouchableOpacity onPress={()=>
                                                      changeOrder(Number(id),item.id,item.order_index+1, item.order_index)}>
                                                      <Text className='text-white font-bold ' style={{transform:[{scale:2}]}}>⇓</Text>
                                                    </TouchableOpacity>)}
                                                  
                                                  </View>
                                                
                                              </View>
                       </TouchableOpacity>)}
                       keyExtractor={(item) =>item.id.toString()}
                       className="mt-6 w-full "/>

             <View className='mt-2'>
              <CustomButton buttonText='Add Exercise' onPress={()=>router.push({pathname: '/otherPages/exercise_list_adding',
                                                                                params: {workout_id:workout?.id}})}/>
             </View>
             <View className='mt-4'>
                                         
                                         <CustomButton buttonText='Start Workout' 
                                                                onPress={()=>{beginSession(workout?.id);}}/>
            </View>
             <View className='mt-4'>
                                         
                                         <CustomButton buttonText='Back' 
                                                                onPress={()=>router.push('/(tabs)/workouts')}/>
            </View>
             

         </SafeAreaView>
   </SafeAreaProvider>
  )
}

export default WorkoutInformation
