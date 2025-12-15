import CustomButton from '@/Components/button';
import { exerciseStatic, general, session } from '@/constants/content';
import { useSessionStore, useUserPreferences, useWorkoutStore } from '@/state/stateStore';
import { Height } from '@/utils';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, LayoutAnimation, Modal, Platform, Text, TextInput, TouchableOpacity, UIManager, View } from 'react-native';
import DraggableFlatList from "react-native-draggable-flatlist";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { GestureHandlerRootView } from 'react-native-gesture-handler';








const WorkoutInformation = () => {
  if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  const { language } = useUserPreferences();
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
    return(<Text>{session.workoutLoad[language]}</Text>)
  }
  if (!workout) {
    return(<Text>{session.workoutNot[language]}</Text>)
  }
  const deleteAlert = (id:number)=> {
      Alert.alert('Remove Exercise?','',
                  [{text: 'Cancel',onPress: () => {},style: 'cancel',},
                   { text: 'YES', onPress: () => deleteExercise(workout.id, id) },],
                   { cancelable: false });
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
              <Text >{session.changeSets[language]}</Text>
              <TextInput value={setNumber>0 ? String(setNumber):''} 
                       onChangeText={(text)=>setSetNumber(Number(text))}
                       keyboardType='numeric'
                       className='text-black border-2 border-light-100 px-4 rounded-md py-1'/>
            </View>
            <View className='flex-row justify-between mt-10'>
              <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                <Text>{general.return[language]}</Text>
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

  const renderItem = ({item, drag, isActive})=>{  
    return(
      <TouchableOpacity onPress={async()=>{setSetNumber(item.set_number);setExerciseId(item.id);setModalVisible(true)}}
                        onLongPress={()=>deleteAlert(item.id)}
                        style={{marginTop:15}}>
        <View style={{backgroundColor: isActive ? 'rgba(255,255,255,0.1)' : 'transparent',
                      alignSelf: 'center', width: '90%', paddingHorizontal:25}}
              className='flex flex-row py-4 rounded-md border-2 border-[rgba(255,255,255,0.05)] items-center justify-between'>
          <View className='flex flex-cols'>
           <Text className='text-white text-lg font-bold'>{item.name}</Text>
           <Text className='text-white mr-10'>{item.set_number} {session.sets[language]}</Text>
          </View>
          <TouchableOpacity onLongPress={drag}>
            <Text className='text-white font-bold ' style={{transform:[{scale:2}]}}>⇑⇓</Text>
          </TouchableOpacity>
        </View>
       </TouchableOpacity>
  )}



  return (
    <GestureHandlerRootView>
    <SafeAreaProvider>
         <SafeAreaView className='bg-dark-100' style={{flex: 1, alignItems: "center"}}> 
            {renderModal()}
            <View className="flex flex-row" style={{alignItems:'center', width:'80%', marginTop:30, marginBottom:25}}>
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
              <View style={{flex:1, paddingBottom:50}}>
              <DraggableFlatList
                data={workout.exercises}
                renderItem={renderItem}
                keyExtractor={(item) =>item.id.toString()}
                onDragEnd={({data})=>changeOrder(Number(id), data)}
                containerStyle={{paddingBottom:15}}
              />
              <View style={{flexDirection:'row', alignItems:'center', width:'100%', justifyContent:'space-between', paddingHorizontal:25}}>
                <CustomButton buttonText={exerciseStatic.add[language]} 
                              onPress={()=>router.push({pathname: '/otherPages/exercise_list_adding',
                                       params: {workout_id:workout?.id}})}/>
              <View  style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                <CustomButton buttonText='Back' onPress={()=>router.push('/(tabs)/workouts')}/>
                <CustomButton buttonText={general.start[language]} onPress={()=>{beginSession(workout?.id);}} />
              </View>
             </View>
            </View>
         </SafeAreaView>
   </SafeAreaProvider>
   </GestureHandlerRootView>
  )
}

export default WorkoutInformation
