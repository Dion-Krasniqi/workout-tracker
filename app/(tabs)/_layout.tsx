
import { icons } from "@/constants/icons";
import { useUserPreferences } from "@/state/stateStore";
import { Tabs } from "expo-router";
import { Dimensions, Image, Text } from 'react-native';




const Ticon = ({focused, title}:any) => {
  const { modalOpen } = useUserPreferences();
  // icons are a bit different in size and how they fit so have to treat each diff
  const Width = Dimensions.get("window").width;
  if (focused ) {
    if (title == 'Home'){
      if(modalOpen){
        return 
      }
      return (
        <Image  style={{width:Width/12, height:Width/12, marginTop:25}} source={icons.homepage} />)
    } else {
      return (
        <Image  style={{width:Width/6, height:Width/6, marginTop:25}} source={icons.workouts} />)
    }
    }
  return (
      <Text className='flex-1  w-full min-w-[120px]
                    min-h-14 mt-16 text-center overflow-hidden text-light-100'>{title}</Text>

    )
};

const TabLayout = () => { 
  return (
    <Tabs screenOptions={{tabBarShowLabel:false,
                          tabBarItemStyle:{width:'100%',
                                           height:'100%',
                                           justifyContent:'center',
                                           alignItems:'center',},
                          tabBarStyle:{borderRadius:25,
                                       marginBottom:50,
                                       marginHorizontal:10,
                                       height:70,
                                       position:'absolute',}}}>
      <Tabs.Screen name="index" options={{ title:'Home', headerShown:false, tabBarIcon:({ focused })=> (
                <Ticon focused={focused} title='Home' />)}}/>
      <Tabs.Screen name="workouts" options={{ title:'Workouts', headerShown:false, tabBarIcon:({ focused })=> (
                <Ticon focused={focused} title='Workouts'  />)}}/>
    </Tabs>
  )
}

export default TabLayout