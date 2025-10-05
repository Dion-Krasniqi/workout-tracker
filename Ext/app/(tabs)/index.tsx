import CustomButton from "@/Components/button";
import Search from "@/Components/search";
import { useEffect, useState } from "react";
import { FlatList, ScrollView, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { getAllGroups, getAllSessions,  getExercise, getWorkoutbyId, startSession } from "../db/queries";
import { NameCardSesh } from "@/Components/nameCard";
import { useSessionStore, useStore } from "@/state/stateStore";
import { router } from "expo-router";



export default function Index() {
  

  const [searchQuery, setSearchQuery] = useState('');
  const count = useStore((state)=>state.count);
  const increment = useStore((state)=>state.increment);
  const {activeSession} = useSessionStore();

  
  
  

  return (
    <SafeAreaProvider>
      <SafeAreaView className='bg-dark-100' style={{flex: 1}}> 
      <ScrollView>
        <View className="mx-2 items-center mt-10">
        <Search value={searchQuery}
                onChangeText={(text: string) => setSearchQuery(text)}/>

        
        </View>
        <View className='mt-5'>
          <Text className="text-white self-center">Session Count Test:{count}</Text>
          <CustomButton onPress={increment} buttonText='Increment' />
        </View>
        {activeSession && <View className='mt-5'>
          <CustomButton onPress={()=>router.push('/session/dummysesh')} buttonText={activeSession?.session_name} />
        </View>}
        <FlatList data={[]}
                  renderItem={(item)=>(<Text className="text-white">1</Text>)}
                  //keyExtractor={({item})=>item.id.toString()}
                  contentContainerStyle={{alignItems:'center'}}
                  ListHeaderComponent={(<View>
                                        <Text className='text-white font-semibold mt-5'>Previous Sessions</Text>
                                       </View>)}
                  ListEmptyComponent={(<View>
                                        <Text className='text-white font-semibold mt-5'>No Sessions Recorded</Text>
                                       </View>)}/>
        
        {/*<FlatList data={sessions}
                  renderItem={({item})=>(<NameCardSesh {...item} />)}
                  keyExtractor={(item) =>item.id.toString()}
                  className="mt-8 w-full self-center"
                  scrollEnabled={false}/>*/}

        </ScrollView>

      
      
      
      
    </SafeAreaView>

    </SafeAreaProvider>
    
  );
}
