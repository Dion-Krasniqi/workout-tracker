import { View, Text, TextInput, FlatList } from 'react-native'
import React, { useState } from 'react'
import { SessionExercise, SessionSet } from '@/interfaces/interfaces';

export const SetView = ({set}:{set:SessionSet}) => {
  const [weight, setWeight] = useState(0);
  const [reps, setReps] = useState(0);

  return (
      
      <View className='flex-row justify-around mt-2 items-center' >
        <Text className='text-light-100 text-xl mb-1'>Set {set.set_number}</Text>
        <View className='flex-row gap-5 justify-end'>
          <TextInput placeholder={(set.weight).toString()+' kg'}
                 keyboardType='numeric' 
                 onChangeText={(text)=>setWeight(Number(text))}
                 placeholderTextColor={'darkgrey'}
                 scrollEnabled={false}
                 className='text-start px-2 text-white border-2 border-light-100 rounded-md h-[40] w-[40%]'/>
          <TextInput placeholder={(set.reps).toString()}
                 keyboardType='numeric' 
                 onChangeText={(text)=>setReps(Number(text))}
                 placeholderTextColor={'darkgrey'}
                 scrollEnabled={false}
                 className='text-center px-2 text-white border-2 border-light-100 rounded-md h-[40] w-[20%]'/>
        </View>
      </View>
  
  )
}

export const ExerciseView = ({exercise}:{exercise:SessionExercise}) => {


  return (
    <View className='mb-5 px-7'>
      <View className='mt-5 mb-3'>
        <Text className='text-white font-semibold text-xl'>{exercise.name}</Text>
      </View>
      <View className='justify-center'>
        <FlatList data={exercise.sets}
                renderItem={(item)=>(<SetView set={item.item}/>)}
                contentContainerStyle={{margin:0}}/>
        <TextInput placeholder={'Notes'}
                 placeholderTextColor={'darkgrey'}
                 scrollEnabled={false}
                 className='text-center px-2 text-white border-2 border-light-100 rounded-md h-[60] mt-5 w-[90%] self-center'/>
      </View>
    </View>
  )
}
