import { exerciseStatic } from '@/constants/content';
import { ExerciseInfo } from '@/interfaces/interfaces';
import { useUserPreferences } from '@/state/stateStore';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Dimensions, FlatList, Text, View } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { getAllExerciseSets, getExercise } from '../db/queries';


const setEntry = (weight:number,reps:number,date:number,marked?:boolean)=>{
  const time = new Date(date).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'});
  return (
    <View className='items-center border-t-2 w-full self-center py-4 rounded-xl'>
      <Text className='text-white font-bold text-xl'>{marked && 'Marked:'}{weight}kg for {reps} reps at {time}</Text>
    </View>
  )
}

const ExerciseInformation = () => {
  const {id} = useLocalSearchParams();
  const [exercise, setExercise] = useState<ExerciseInfo | null>(null);
  const [sets, setSets] = useState<{weight:number;reps:number;date:number}[] | null>(null);
  const [weight,setWeight] = useState<{value:number,dataPointText:string,dataPointColor:string,label:string,showVerticalLine?:boolean,verticalLineColor?:string}[] | []>([]);


  useEffect(()=>{
    async function setup(){
      //@ts-ignore
      const result = await getExercise(parseInt(id));
      const data = await getAllExerciseSets(Number(id));
      setSets(data);
      setExercise(result);
      // so doesnt change sets
      setWeight([...data].reverse().map((s:any)=>({value: s.weight,
                                                   dataPointText: s.reps + ' reps',
                                                   dataPointColor: (s.marked && s.marked == 1) ? '#ff0000ff' : '#ffffffff',
                                                   showVerticalLine: (s.marked && s.marked == 1),
                                                   verticalLineColor: (s.marked && s.marked == 1) && 'rgba(255, 0, 0, 0.31)',
                                                   label: new Date(s.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })})))
      
    }
    setup();
  },[])

  const Width = Dimensions.get("window").width/1.2;
  const { language } = useUserPreferences();
  
  return (
    
    <SafeAreaProvider>
     <SafeAreaView className='flex-1 bg-dark-100' style={{ alignItems: "center"}}> 
      <View className='mt-6'>
       <Text className='text-white font-bold text-2xl'>{exerciseStatic.statsFor[language]} {exercise?.name}</Text>
      </View>
      <View className='w-full flex-1'>
       {weight && weight.length>0 ? 
            (<View style={{overflow:'hidden', alignItems:'center'}}>
              <LineChart color={'#177AD5'} thickness1={5} textColor1="white"
                         textFontSize1={10} yAxisTextStyle={{color: 'white'}}
                         xAxisLabelTextStyle={{color: 'white', fontSize:9, transform:[{ rotate: '45deg' }]}}
                         textFontSize={13} isAnimated initialSpacing={5}
                         endSpacing={20}                         
                         yAxisColor="lightgray" xAxisColor="lightgray"
                         width={Width} adjustToWidth
                         data={weight}
                         showScrollIndicator scrollToEnd/>
              <Text className='text-white text-lg font-bold mt-10'>{exerciseStatic.history[language]}</Text>
              <>
               <FlatList data={sets} renderItem={({item})=>(setEntry(item.weight,item.reps,item.date))}
                         className="mt-6 w-full" style={{marginBottom:290}}
                         scrollEnabled
                         contentContainerStyle={{justifyContent:'space-between'}}/>
              </>
            </View>):
            (<View><Text className='text-white self-center mt-20'>{exerciseStatic.noData[language]}</Text></View>)}  
    </View>   
   </SafeAreaView>
  </SafeAreaProvider>)}

export default ExerciseInformation