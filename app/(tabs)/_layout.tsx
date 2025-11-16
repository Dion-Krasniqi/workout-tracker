
import { Tabs } from "expo-router";
import { Text } from 'react-native';

const Ticon = ({focused, title}:any) => {
  // add icons
  if (focused) {
    return (
      <Text className='flex-1 font-bold w-full flex-1 min-w-[120px]
                    min-h-14 mt-16 text-center overflow-hidden'>{title}</Text>

    )}
  return (
      <Text className='flex-1  w-full flex-1 min-w-[120px]
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
                <Ticon focused={focused} title='Home'/>)}}/>
      <Tabs.Screen name="workouts" options={{ title:'Workouts', headerShown:false, tabBarIcon:({ focused })=> (
                <Ticon focused={focused} title='Workouts'/>)}}/>
    </Tabs>
  )
}

export default TabLayout