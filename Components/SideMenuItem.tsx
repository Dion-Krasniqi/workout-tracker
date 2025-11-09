import { Text, View } from 'react-native';

const SideMenuItem =({label,value}:{label:string;value:string})=> {
  return (
    <View style={{alignItems:'center'}}>
        <Text>{label}</Text>
        <Text>{value}</Text>
    </View>
  )
}
export default SideMenuItem;
