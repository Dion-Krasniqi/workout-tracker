import { Stack } from "expo-router";
import { StackScreen } from "react-native-screens";
import './global.css';

export default function RootLayout() {
  return (
  <Stack >
    <Stack.Screen name='(tabs)' options={{headerShown:false}}/>
    <Stack.Screen name='exercise' options={{headerShown:false}}/>
  </Stack>);
}
