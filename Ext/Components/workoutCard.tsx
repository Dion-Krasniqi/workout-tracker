import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const WorkoutCard = ({id, name}:Workout) => {
  return (
    <TouchableOpacity className='flex-1 w-[90%] m-2 py-2 bg-light-100 rounded-md items-center'>
      <Text className='text-white text-2xl font-md'>{name}</Text>
    </TouchableOpacity>
    
  )
}

export default WorkoutCard