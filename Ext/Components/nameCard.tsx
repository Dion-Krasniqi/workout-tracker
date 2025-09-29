import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Href, Link, RelativePathString, useRouter } from 'expo-router';




export const NameCardExec = ({id, name}: TwoRows) => {
  return (
    
    <Link href={`/exercise/${id}`} asChild>
      <TouchableOpacity className='w-[90%] mt-2 py-2 bg-light-100 rounded-md items-center self-center' >
      <Text className='text-white text-2xl font-md'>{name}</Text>
    </TouchableOpacity>
    </Link>
  
  )
}

export const NameCardWork = ({id, name}: TwoRows) => {
  return (
    
    <Link href={`/workout/${id}`} asChild>
      <TouchableOpacity className='w-[90%] mt-2 py-2 bg-light-100 rounded-md items-center self-center' >
      <Text className='text-white text-2xl font-md'>{name}</Text>
    </TouchableOpacity>
    </Link>
  
  )
}

export const NameCardSesh = ({id, name}: TwoRows) => {
  return (
    
    <Link href={`/workout/${id}`} asChild>
      <TouchableOpacity className='w-[90%] mt-2 py-2 bg-light-100 rounded-md items-center self-center' >
      <Text className='text-white text-2xl font-md'>{name}</Text>
    </TouchableOpacity>
    </Link>
  
  )
}

