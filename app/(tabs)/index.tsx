import CustomButton from "@/Components/button";
import Search from "@/Components/search";
import { FinishedSessionView } from "@/Components/sessionComponents";
import SideMenuItem from "@/Components/SideMenuItem";
import { icons } from "@/constants/icons";
import { useSessionStore, useUserPreferences } from "@/state/stateStore";
import { Height } from "@/utils";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, FlatList, Image, Modal, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { getAllExerciseInstances } from "../db/queries";

const Index = ()=> {

  const loadAllSessions = useSessionStore((state)=>state.loadPreviousSessions);
  const delSessions = useSessionStore((state)=>state.deletePreviousSessions);
  const {activeSession, previousSessions} = useSessionStore();
  const loadingsessions = useSessionStore().loadingsessions;

  const { systemTheme, numberOfSessions, mostCommonWorkout } = useUserPreferences();
  const updateSystemTheme = useUserPreferences((state)=>state.updateSystemTheme);
  const loadSystemTheme = useUserPreferences((state)=>state.loadSystemTheme);
  const syncData = useUserPreferences((state)=>state.syncData);

  const [modalVisible, setModalVisible] = useState(false);

  const changeTheme = async()=> {
    if(systemTheme == 'default'){
      await updateSystemTheme('dark');
    }else{
      await updateSystemTheme('default');
    }
  }

  // side menu def
  const SideMenu = ()=> {
    const [userName, setuserName] = useState('User');
    const [oldUserName, setOldUserName] = useState(userName);

    useEffect(()=>{
      async function setPref(){
        const u = await AsyncStorage.getItem('username') || "User";
        setuserName(u);
        setOldUserName(u);
      }
      setPref();
    },[]);

    useEffect(()=>{
      const timeOutId = setTimeout(async()=>{
        if(userName.trim()){
          if(userName.trim()==oldUserName){
            return
          } else{
            await AsyncStorage.setItem('username', userName);
            setOldUserName(userName);
          }
        } else {
          setuserName(oldUserName);
        }
      }, 500);
      return ()=> clearTimeout(timeOutId);
    },[userName]);
    
    return (
      <Modal /*animationType="slide"*/ transparent={true} visible={modalVisible}
                   onRequestClose={() => {setModalVisible(!modalVisible)}}>
      
                  <TouchableWithoutFeedback onPressOut={() => setModalVisible(!modalVisible)}>
                    <View className="flex-1" style={{ width:Width, height:Height}}>
                      <TouchableWithoutFeedback
                               style={{ height:Height,
                               width:Width*.5}}>
                                <View style={{ backgroundColor: 'white', height:Height,
                                               width:Width*.5, alignItems:'center'}}>
                                  <TextInput value={userName} 
                                             className="font-bold text-2xl mt-12"
                                             onChangeText={setuserName} />
                                  <TouchableOpacity onPress={changeTheme}
                                                                  className="rounded-md bg-black" 
                                                                  style={{width:Width/4, alignItems:'center', marginTop:12}}>
                                    <Text className="color-white p-2 font-bold uppercase">{systemTheme}</Text>
                                  </TouchableOpacity>
                                  <View className="gap-4" style={{marginVertical:50}}>
                                    <SideMenuItem label='Sessions this month:' value={String(numberOfSessions)}/>
                                    <SideMenuItem label='Most Common Workout:' value={mostCommonWorkout} />
                                    <TouchableOpacity onPress={syncData} 
                                                      style={{alignSelf:'center',borderRadius:5, marginTop:30}} className='bg-dark-200'>
                                      <Text className="color-white font-bold" style={{padding:10}}>Sync Data</Text>
                                    </TouchableOpacity>
                                    
                                  </View>
                                  
                                  {/*<CustomButton buttonText="Reset Data" onPress={()=>console.log('reset')} style=" bg-black"/>*/}
                                  
                                </View>
                          
                          
                      </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
              </Modal>)};

  // home page setup
  useEffect(()=>{
    loadAllSessions();
    getAllExerciseInstances();
    loadSystemTheme();
    syncData();
  },[]);

  const Width = Dimensions.get("window").width;

  return (
    <SafeAreaProvider>
      <SafeAreaView className='bg-dark-100' style={{flex: 1, paddingBottom:80,left:modalVisible ? Width*.5 : 0}}> 
        {SideMenu()}
        {loadingsessions ? (<ActivityIndicator size="large" className="flex-1 justify-center" color="#fff"/>):
         (<View>
           {/* Header */}
           <View className='mt-5 border-b-2 border-light-100 pb-6'>
            <View className='mt-2 flex-row items-center justify-between px-4'>
             <TouchableOpacity onPress={()=>{setModalVisible(!modalVisible)}} style={{width:Width/14, height:Width/14}}>
              <Image source={icons.hamburger} style={{tintColor:'white',width:Width/14, height:Width/14}}/>
             </TouchableOpacity>
             <View>{activeSession ? (<TouchableOpacity onPress={()=>router.push('/session/dummysesh')}
                                                       className="bg-white rounded-md" style={{width:Width/2.5}}>
                                      <Text className="py-2 self-center font-bold">{activeSession?.session_name}</Text>
                                     </TouchableOpacity>):
                                    (<Text className="text-white self-center font-bold">No active session</Text>)}
             </View>
            </View>
           </View>
           {/* Body */}
           <FlatList data={previousSessions}
                  renderItem={({item})=>(<FinishedSessionView sesh={item}/>)}
                  contentContainerStyle={{alignItems:'center',marginBottom:120}}
                  ListHeaderComponent={previousSessions.length>0 ? 
                                       (<View style={{width:Width*.8}}>
                                         <Search  onPress={()=>router.push('/otherPages/SearchPage')} pholder="Search Session"/>
                                        </View>):
                                       (<View></View>)}
                  ListEmptyComponent={<Text className='text-white font-semibold mt-5'>No Sessions Recorded</Text>}
                  ListFooterComponent={<View className="mb-24 mt-8 w-full">
                                        {previousSessions.length>0 && <CustomButton onPress={()=>delSessions()} buttonText='Delete All'/>}
                                       </View>}/>
          </View>)}
     </SafeAreaView>
    </SafeAreaProvider>)}
export default Index;