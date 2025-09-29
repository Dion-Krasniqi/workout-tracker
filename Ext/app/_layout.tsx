import { Stack } from "expo-router";
import { StackScreen } from "react-native-screens";
import './global.css';
import { useEffect } from "react";
import { initDB } from "./db/db";

export default function RootLayout() {
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
  }, []);

  return (
  <Stack >
    <Stack.Screen name='(tabs)' options={{headerShown:false}}/>
    <Stack.Screen name="exercise/[id]" options={{ headerShown: false}}/>
    <Stack.Screen name="workout/[id]" options={{ headerShown: false}}/>
    <Stack.Screen name='otherPages/exercise_creation' options={{headerShown:false}}/>
    <Stack.Screen name='otherPages/exercise_list' options={{headerShown:false}}/>
    <Stack.Screen name='otherPages/exercise_list_adding' options={{headerShown:false}}/>
    <Stack.Screen name='otherPages/workout_creation' options={{headerShown:false}}/>
  </Stack>);
}
