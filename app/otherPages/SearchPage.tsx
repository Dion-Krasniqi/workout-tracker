import CustomButton from '@/Components/button'
import Search from '@/Components/search'
import { FinishedSessionView } from '@/Components/sessionComponents'
import { Session } from '@/interfaces/interfaces'
import { useSessionStore } from '@/state/stateStore'
import { useEffect, useState } from 'react'
import { Dimensions, FlatList, Text, View } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

const SearchPage = () => {
  const delSessions = useSessionStore((state)=>state.deletePreviousSessions);
  const findSessions = useSessionStore((state)=>state.findPreviousSessions);
  const { previousSessions } = useSessionStore();

  const [query, setQuery] = useState('');
  const [foundSessions, setFoundSessions] = useState<Session[]>(previousSessions)

  useEffect(() => {
    
    const timeOutId = setTimeout( async()=>{
      if(query.trim()){
        
        const s = await findSessions(query);
        if (s){
          setFoundSessions(s)
        }
      } else {
        setFoundSessions(previousSessions)
      };
    },500);

    return () => clearTimeout(timeOutId);

  },[query]);

  const Width = Dimensions.get("window").width;



  return (
    <SafeAreaProvider>
          <SafeAreaView className='bg-dark-100' style={{flex: 1, alignItems: "center"}} >
            <View style={{width:Width*.8,marginBottom:50}}>
              <Search value={query} onChangeText={(text:string)=>setQuery(text)}/>
            </View>
            <View>
              <>
                <FlatList data={foundSessions}
                  renderItem={({item})=>(<FinishedSessionView sesh={item}/>)}
                  //keyExtractor={({item})=>item.id.toString()}
                  contentContainerStyle={{alignItems:'center',marginBottom:120}}
                  ListHeaderComponent={foundSessions.length>0 ? (<View>
                                        {query.length>0 ? (<Text className='text-white font-semibold mt-5'>Results for 
                                                    <Text className='text-blue-100'> {query}</Text></Text>)
                                                    :(<Text className='text-light-100 font-semibold mt-5'>Search is Case Sensitive</Text>)}
                                       </View>):(<View></View>)}
                  ListEmptyComponent={<Text className='text-white font-semibold mt-5'>No Sessions Match The Query</Text>
                                       }
                  ListFooterComponent={
                  <View className="mb-24 mt-8 w-full">{foundSessions.length>0 && <CustomButton onPress={()=>delSessions()} buttonText='Delete All'/>}</View>
                  }
                  />
              
              
              
              </>
            </View>

          </SafeAreaView>
          </SafeAreaProvider>
  )
}

export default SearchPage