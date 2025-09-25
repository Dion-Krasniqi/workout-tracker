import CustomButton from "@/Components/button";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    > 
    <Text className='text-white'>D</Text>
      <CustomButton buttonText="Func" link='/'/>
      
    </View>
  );
}
