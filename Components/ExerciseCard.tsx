import { ExerciseInfo } from "@/interfaces/interfaces"
import { Link } from "expo-router"
import { Text, TouchableOpacity } from "react-native"


// General Exercise List Item
const ExerciseCard = ({id, name}: ExerciseInfo) => {
  return (
    <Link href={`/exercise/${id}`} asChild>
      <TouchableOpacity className='bg-dark-200 
                                 rounded-md border-2 border-[rgba(255,255,255,0.05)] 
                                 items-center self-center' 
                      style={{paddingVertical:12, width:'90%', marginTop:10}}>
      <Text className='text-white text-2xl font-md'>{name}</Text>
    </TouchableOpacity>
    </Link>
  )
}

export default ExerciseCard;