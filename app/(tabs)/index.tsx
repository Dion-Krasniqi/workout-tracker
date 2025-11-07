import CustomButton from "@/Components/button";
import Search from "@/Components/search";
import { FinishedSessionView } from "@/Components/sessionComponents";
import { icons } from "@/constants/icons";
import { useSessionStore } from "@/state/stateStore";
import { router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Dimensions, FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { getAllExerciseInstances } from "../db/queries";



export default function Index() {

  const loadAllSessions = useSessionStore((state)=>state.loadPreviousSessions);
  const delSessions = useSessionStore((state)=>state.deletePreviousSessions);
  const {activeSession, previousSessions} = useSessionStore();
  const loadingsessions = useSessionStore().loadingsessions;
  

  
  
  useEffect(()=>{
    loadAllSessions();
    getAllExerciseInstances();
  },[]);
  const Width = Dimensions.get("window").width;

  return (
    <SafeAreaProvider>
      <SafeAreaView className='bg-dark-100 ' style={{flex: 1, paddingBottom:80}}> 
      
     
        {loadingsessions ? (<ActivityIndicator size="large" className="flex-1 justify-center" color="#fff"/>):(
          <View>
           
        {/*<View className="mx-2 items-center mt-10 px-2">
        <Search value={searchQuery}
                onChangeText={(text: string) => setSearchQuery(text)}/>

        
        </View>*/}
        <View className='mt-5 border-b-2 border-light-100 pb-6'>
          <View className='mt-2 flex-row items-center justify-between px-4'>
            <TouchableOpacity onPress={()=>{}} style={{width:Width/14, height:Width/14}}>
              <Image source={icons.hamburger} style={{tintColor:'white',width:Width/14, height:Width/14}}/>
            </TouchableOpacity>
            <View >
              {activeSession ? 
            (<TouchableOpacity onPress={()=>router.push('/session/dummysesh')}
                              className="bg-white rounded-md" style={{width:Width/2.5}}>
              <Text className="py-2 self-center font-bold">{activeSession?.session_name}</Text>
            </TouchableOpacity>)
            :(<Text className="text-white self-center font-bold">No active session</Text>)}
            </View>
          </View>
        </View>
        <FlatList data={previousSessions}
                  renderItem={({item})=>(<FinishedSessionView sesh={item}/>)}
                  //keyExtractor={({item})=>item.id.toString()}
                  contentContainerStyle={{alignItems:'center',marginBottom:120}}
                  ListHeaderComponent={previousSessions.length>0 ? (<View style={{width:Width*.8}}>
                                        {/*<Text className='text-white font-semibold mt-5'>Previous Sessions</Text>*/}
                                        <Search  onPress={()=>router.push('/otherPages/SearchPage')} pholder="Search Session"/>
                                       </View>):(<View></View>)}
                  ListEmptyComponent={<Text className='text-white font-semibold mt-5'>No Sessions Recorded</Text>
                                       }
                  ListFooterComponent={
                  <View className="mb-24 mt-8 w-full">{previousSessions.length>0 && <CustomButton onPress={()=>delSessions()} buttonText='Delete All'/>}</View>
                  }
                  />
          </View>)}
        
        </SafeAreaView>

    </SafeAreaProvider>
    
  );
}
