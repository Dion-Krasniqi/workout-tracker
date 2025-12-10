import { session } from "@/constants/content";
import { Session } from "@/interfaces/interfaces";
import { useSessionStore, useUserPreferences } from "@/state/stateStore";
import { formatDate, getMonth } from "@/utils";
import { Link } from "expo-router";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";

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

  return (
    <Link href={`/session/completed/${sesh.id}`} asChild>
      <TouchableOpacity className='flex flex-row items-center rounded-md justify-between px-2 bg-white mt-4' 
                        style={{width:screenWidth, height:85}} 
                        onPress={async()=>{await setSession(Number(sesh.id))}}>
        <View style={{alignItems:'center', paddingHorizontal:20, paddingVertical:11,}} className="bg-dark-200 rounded-md">
            <Text className="text-3xl text-white font-bold">{date.charAt(0)}{date.charAt(1)}</Text>
            <Text className="text-white font-bold">{getMonth(date.substring(3,5))}</Text>
        </View>
        
        <Text className='font-bold text-3xl text-center'>{sesh.session_name}</Text>
        <Text className='text-center'>{session.duration[language]}: {hours}:{minutes}:{seconds}</Text>
        
         
      </TouchableOpacity>
      </Link>
              )

}