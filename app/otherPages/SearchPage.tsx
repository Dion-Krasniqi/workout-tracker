import CustomButton from '@/Components/button';
import Search from '@/Components/search';
import { FinishedSessionView } from '@/Components/sessionComponents';
import { general, homepage } from '@/constants/content';
import { Session } from '@/interfaces/interfaces';
import { useSessionStore, useUserPreferences } from '@/state/stateStore';
import { useEffect, useState } from 'react';
import { Dimensions, FlatList, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const SearchPage = () => {
  const delSessions = useSessionStore((state)=>state.deletePreviousSessions);
  const findSessions = useSessionStore((state)=>state.findPreviousSessions);
  const { previousSessions } = useSessionStore();
  const { language } = useUserPreferences();

  const [query, setQuery] = useState('');
  const [foundSessions, setFoundSessions] = useState<Session[]>(previousSessions)

  useEffect(() => {
    const timeOutId = setTimeout( async()=>{
      if(query.trim()){
        const s = await findSessions(query);
        if (s) setFoundSessions(s);
       
      } else setFoundSessions(previousSessions)
    },500);
    return () => clearTimeout(timeOutId);
  },[query]);

  const Width = Dimensions.get("window").width;

  return (
    <SafeAreaProvider>
     <SafeAreaView className='bg-dark-100' style={{flex: 1, alignItems: "center"}} >
      <View style={{width:Width*.8,marginBottom:50}}>
       <Search value={query} pholder={homepage.searchSession[language]} onChangeText={(text:string)=>setQuery(text)}/>
      </View>
      <View>
       <>
        <FlatList data={foundSessions} renderItem={({item})=>(<FinishedSessionView sesh={item}/>)}
                  //keyExtractor={({item})=>item.id.toString()}
                  contentContainerStyle={{alignItems:'center',marginBottom:120}}
                  ListHeaderComponent={foundSessions.length>0 ? 
                                      (<View>{query.length>0 ? 
                                            // create a component for this
                                            (<Text className='text-white font-semibold mt-5'>
                                              {homepage.searchResult[language]}<Text className='text-blue-100'> {query}</Text></Text>):
                                            (<Text className='text-light-100 font-semibold mt-5'>
                                              {homepage.searchCase[language]}
                                             </Text>)}
                                       </View>):
                                       (<View></View>)}
                  ListEmptyComponent={<Text className='text-white font-semibold mt-5'>{homepage.searchEmpty[language]}</Text>}
                  ListFooterComponent={<View className="mb-24 mt-8 w-full">
                                        {foundSessions.length>0 && 
                                         <CustomButton onPress={()=>delSessions()} buttonText={general.deleteAll[language]}/>}
                                       </View>}/>
       </>
      </View>
     </SafeAreaView>
    </SafeAreaProvider>)
}

export default SearchPage