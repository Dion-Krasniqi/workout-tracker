import CustomButton from "@/Components/button";
import Search from "@/Components/search";
import { useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { getAllWorkoutTemplates, getExercise, startSession } from "../db/queries";

export default function Index() {
  

  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SafeAreaProvider>
      <SafeAreaView
      className='bg-dark-100'
      style={{
        flex: 1,
        
        alignItems: "center",
      }} 
    > 

      <View className="mx-2 items-center mt-10">
        <Search value={searchQuery}
                onChangeText={(text: string) => setSearchQuery(text)}/>

        
      </View>
      <View className='mt-5'>
        <CustomButton onPress={()=>startSession('Push A')} buttonText='Start Session' />
      </View>
      
      
      
    </SafeAreaView>

    </SafeAreaProvider>
    
  );
}
