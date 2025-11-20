import { useSessionStore, useWorkoutStore } from "@/state/stateStore";
import { Stack } from "expo-router";
import { useEffect, useRef } from "react";
import { AppState } from "react-native";
import { initDB } from "./db/db";
import './global.css';

export default function RootLayout() {
  const onInactive = useSessionStore((state)=>state.onInactive);
  const getDeadSession = useSessionStore((state)=>state.getDeadSession);

  
  const appState = useRef(AppState.currentState);
  
    useEffect(() => {
      const subscription = AppState.addEventListener('change', nextAppState => {
        appState.current = nextAppState;
        if(appState.current=='background'){
          console.log('exited'); 
          onInactive();
        }
      });
      return () => {
        subscription.remove();
      };
    }, []);

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
    getDeadSession();
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
