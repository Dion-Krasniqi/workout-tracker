import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '@/Components/button'

const Workouts = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView
      className='bg-dark-100'
      style={{
        flex: 1,
        
        alignItems: "center",
      }} 
    > 
      <View className='mt-10'>
        <CustomButton buttonText='Create Workout' />
      </View>

      
      
      
      
    </SafeAreaView>

    </SafeAreaProvider>
  )
}

export default Workouts