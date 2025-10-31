import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

const SearchPage = () => {
  return (
    <SafeAreaProvider>
          <SafeAreaView className='bg-dark-100' style={{flex: 1, alignItems: "center"}} >

          </SafeAreaView>
          </SafeAreaProvider>
  )
}

export default SearchPage