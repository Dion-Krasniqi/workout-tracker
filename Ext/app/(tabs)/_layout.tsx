
import React from 'react'
import { Stack, Tabs } from "expo-router";
import HomeFilledIcon from '@mui/icons-material/HomeFilled';



const TabLayout = () => {

    
  return (
    <Tabs>
      <Tabs.Screen 
            name="index"
            options={{ title:'Home', headerShown:false, }}
        />
        <Tabs.Screen 
            name="workouts"
            options={{ title:'Workouts', headerShown:false, }}
        />
    </Tabs>


  )
}

export default TabLayout