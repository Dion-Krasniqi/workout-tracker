import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Link, useRouter } from 'expo-router';




const NameCard = ({id, name}:TwoRows) => {
  return (
    <Link href={`/exercise/${id}`} asChild>
      <TouchableOpacity className='w-[90%] m-2 py-2 bg-light-100 rounded-md items-center' >
      <Text className='text-white text-2xl font-md'>{name}</Text>
    </TouchableOpacity>
    </Link>
  
  )
}

export default NameCard