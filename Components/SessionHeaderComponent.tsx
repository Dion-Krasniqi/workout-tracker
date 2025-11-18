import { Text, View } from "react-native"


export const SessionHeaderComponent = ({text, width=100}:{text:string, width?:number}) => {
  return (
    <View className='rounded-md h-[50] justify-center px-2 bg-white' style={{width:`${width}%`}}>
               <Text className='font-bold text-center'>{text}</Text>
    </View>
  )
}