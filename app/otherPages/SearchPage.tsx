import CustomButton from '@/Components/button'
import Search from '@/Components/search'
import { FinishedSessionView } from '@/Components/sessionComponents'
import { useSessionStore } from '@/state/stateStore'
import { useState } from 'react'
import { FlatList, Text, View } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

const SearchPage = () => {
  const delSessions = useSessionStore((state)=>state.deletePreviousSessions);
  const findSessions = useSessionStore((state)=>state.findPreviousSessions);

  const [query, setQuery] = useState('');

  const search = ()=> {
    
  }



  return (
    <SafeAreaProvider>
          <SafeAreaView className='bg-dark-100' style={{flex: 1, alignItems: "center"}} >
            <View>
              <Search/>
            </View>
            <View>
              <>
                <FlatList data={previousSessions}
                  renderItem={({item})=>(<FinishedSessionView sesh={item}/>)}
                  //keyExtractor={({item})=>item.id.toString()}
                  contentContainerStyle={{alignItems:'center',marginBottom:120}}
                  ListHeaderComponent={previousSessions.length>0 ? (<View>
                                        {/*<Text className='text-white font-semibold mt-5'>Previous Sessions</Text>*/}
                                       </View>):(<View></View>)}
                  ListEmptyComponent={<Text className='text-white font-semibold mt-5'>No Sessions Recorded</Text>
                                       }
                  ListFooterComponent={
                  <View className="mb-24 mt-8 w-full">{previousSessions.length>0 && <CustomButton onPress={()=>delSessions()} buttonText='Delete All'/>}</View>
                  }
                  />
              
              
              
              </>
            </View>

          </SafeAreaView>
          </SafeAreaProvider>
  )
}

export default SearchPage