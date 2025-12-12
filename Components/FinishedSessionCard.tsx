import { session } from "@/constants/content";
import { icons } from "@/constants/icons";
import { Session } from "@/interfaces/interfaces";
import { useSessionStore, useUserPreferences } from "@/state/stateStore";
import { formatDate, getMonth } from "@/utils";
import { Link } from "expo-router";
import { Alert, Dimensions, Image, Text, TouchableOpacity, View } from "react-native";

export const FinishedSessionView = ({sesh}:{sesh:Session}) =>{
  //@ts-ignore
  let seconds = (sesh.time_ended-sesh.time_started)/1000;
  const hours = Math.floor(seconds / 3600);
  seconds = seconds % 3600;
  const minutes = Math.floor(seconds/60)
  seconds = Math.round(seconds%60);
  const date = formatDate(sesh.time_started)
  const screenWidth = Dimensions.get("window").width/1.1;
  const { language } = useUserPreferences();

  const setPrevSession = useSessionStore((state)=>state.setPreviousSession);
  const loadExercises = useSessionStore((state)=>state.loadPreviousSession);
  //check
  const setSession = async(id:number)=> {
    const ses = await setPrevSession(id);
    await loadExercises(id);
  };
  const alert = ()=> {
    Alert.alert('Session data will be lost forever','Do you wish to proceed?',
                [{text: 'Cancel',onPress: () => {},style: 'cancel',},
                 { text: 'YES', onPress: () => console.log("Deleted") },],
                 { cancelable: false });
  }

  return (
    <Link href={`/session/completed/${sesh.id}`} asChild>
      <TouchableOpacity className='flex flex-row items-center rounded-xl justify-between px-2 bg-white mt-4' 
                        style={{width:screenWidth, height:85}} 
                        onPress={async()=>{await setSession(Number(sesh.id))}}>
        <View style={{padding:20}} className="bg-dark-200 rounded-lg flex items-center justify-center">
            <Text className="text-4xl text-white font-bold text-center" style={{lineHeight:23}}>{date.charAt(0)}{date.charAt(1)}</Text>
            <Text className="text-white font-bold text-center" style={{lineHeight:11}}>{getMonth(date.substring(3,5))}</Text>
        </View>
        <View className="flex items-center justify-center">
            <Text className='font-bold text-3xl text-center'>{sesh.session_name}</Text>
            <Text className='text-center'>{session.duration[language]}: {hours}:{minutes}:{seconds}</Text>
        </View>
        
        <TouchableOpacity style={{padding:20, alignItems:'center', justifyContent:'center'}} onPress={()=>alert()}>
            <Image source={icons.trash} style={{transform:[{scale:1.2}]}}/>
        </TouchableOpacity>
        
        
        
         
      </TouchableOpacity>
      </Link>
              )

}