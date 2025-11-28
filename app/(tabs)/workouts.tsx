import CustomButton from '@/Components/button'
import Search from '@/Components/search'
import WorkoutCard from '@/Components/WorkoutCard'
import { workout } from '@/constants/content'
import { WorkoutTemplate } from '@/interfaces/interfaces'
import { useUserPreferences, useWorkoutStore } from '@/state/stateStore'
import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { FlatList, ScrollView, View } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { exportAllSetData } from '../db/db'

const Workouts = () => {
  
  const router = useRouter();
  const [query, setQuery] = useState('');
  const { language } = useUserPreferences();

  const workoutControl = useWorkoutStore();
  const [workouts, setWorkouts] = useState<WorkoutTemplate[]>([]);
  
  // setup
  useEffect(()=>{
   const tempW = workoutControl.workouts;
   setWorkouts(tempW);
  },[]);

  useEffect(()=>{
   const timeOutId = setTimeout( async()=>{
    if(query.trim()){
      const qResult = workoutControl.workouts.filter((w)=>w.name.includes(query));
      if (qResult) {setWorkouts(qResult)};
    }else{ 
        const result = workoutControl.workouts;
        setWorkouts(result);
    }
   },500);

   return () => clearTimeout(timeOutId);
  },[query]);

  
  
  return (
    <SafeAreaProvider>
     <SafeAreaView className='bg-dark-100' style={{flex: 1,alignItems: "center",}}> 
      <ScrollView className="flex w-full px-5 mb-24" showsVerticalScrollIndicator={false} 
                  contentContainerStyle={{ minHeight:'100%'}}>
       <View style={{flexDirection:'row', marginTop:30, justifyContent:'space-between', 
                     alignItems:'center', marginHorizontal:5}}>
        <CustomButton onPress={()=>router.push('/otherPages/workout_creation')} buttonText={workout.create[language]} />
        <CustomButton onPress={()=>router.push('/otherPages/exercise_list')} buttonText={workout.exerciseList[language]} />
       </View>
       <View className='flex-1 w-[100%]'>
        <>
         <FlatList data={workouts}
                   keyExtractor={(item) =>item.id.toString()}
                   className="mt-8 w-full self-center"
                   scrollEnabled={false}
                   ListHeaderComponent={<View style={{width:'95%', alignSelf:'center', marginBottom:30}}>
                                          <Search pholder={workout.searchWorkout[language]} 
                                                  value={query} 
                                                  onChangeText={(text)=>{setQuery(text)}}/>
                                         </View>}
                    ListFooterComponent={<CustomButton onPress={()=>exportAllSetData()} buttonText={workout.extract[language]} />}
                    ListFooterComponentStyle={{marginTop:30}}
                   renderItem={({item})=>(<WorkoutCard item={item} />)}/>
        </>
       </View>
      </ScrollView>
     </SafeAreaView>
    </SafeAreaProvider>)}

export default Workouts;