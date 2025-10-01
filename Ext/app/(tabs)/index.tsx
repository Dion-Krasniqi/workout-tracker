import CustomButton from "@/Components/button";
import Search from "@/Components/search";
import { useEffect, useState } from "react";
import { FlatList, ScrollView, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { getAllGroups, getAllSessions, getAllWorkoutTemplates, getExercise, getWorkoutbyId, startSession } from "../db/queries";
import { NameCardSesh } from "@/Components/nameCard";



export default function Index() {
  

  const [searchQuery, setSearchQuery] = useState('');
  const [sessions, setSessions] = useState<(Session & TwoRows)[]>([]);

  useEffect(() => {
      async function setup() {
        const result = await getAllSessions();
        const sessionMap = await Promise.all(
          result.map(async (session)=>{
            const workout = await getWorkoutbyId(session.workout_id);
            return {...session, ...workout};
          })
        )
        //@ts-ignore
        setSessions(sessionMap);
        getAllGroups();
      }
      setup();
    }, []);
  
  

  return (
    <SafeAreaProvider>
      <SafeAreaView className='bg-dark-100' style={{flex: 1}}> 
      <ScrollView>
        <View className="mx-2 items-center mt-10">
        <Search value={searchQuery}
                onChangeText={(text: string) => setSearchQuery(text)}/>

        
        </View>
        <View className='mt-5'>
          <CustomButton onPress={()=>startSession('Push C')} buttonText='Start Session' />
        </View>
        <FlatList data={sessions}
                  renderItem={({item})=>(<NameCardSesh {...item} />)}
                  keyExtractor={(item) =>item.id.toString()}
                  className="mt-8 w-full self-center"
                  scrollEnabled={false}/>

        </ScrollView>

      
      
      
      
    </SafeAreaView>

    </SafeAreaProvider>
    
  );
}
