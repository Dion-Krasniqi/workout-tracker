import { useWorkoutStore } from "@/state/stateStore";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { initDB } from "./db/db";
import './global.css';

export default function RootLayout() {

  const loadWorkouts = useWorkoutStore((state)=>state.loadWorkouts);

  useEffect(()=>{
    const setupDB = async ()=>{
      try {
        await initDB();
        console.log('out')
      } catch (err){
        console.log(err);
      }
    }
    setupDB();
    loadWorkouts();
  }, []);

  return (
  <Stack >
    <Stack.Screen name='(tabs)' options={{headerShown:false}}/>
    
    <Stack.Screen name="exercise/[id]" options={{ headerShown: false}}/>
    <Stack.Screen name="exercise_add/[id]" options={{ headerShown: false}}/>
    <Stack.Screen name="workout/[id]" options={{ headerShown: false}}/>
    <Stack.Screen name="session/completed/[id]" options={{ headerShown: false}}/>
    <Stack.Screen name="session/dummysesh" options={{ headerShown: false}}/>

    <Stack.Screen name='otherPages/exercise_creation' options={{headerShown:false}}/>
    <Stack.Screen name='otherPages/exercise_list' options={{headerShown:false}}/>
    <Stack.Screen name='otherPages/exercise_list_adding' options={{headerShown:false}}/>
    <Stack.Screen name='otherPages/workout_creation' options={{headerShown:false}}/>
    <Stack.Screen name='otherPages/SearchPage' options={{headerShown:false}}/>
  </Stack>);
}
