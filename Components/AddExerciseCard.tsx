import { ExerciseInfo } from "@/interfaces/interfaces";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity } from "react-native";

// Adding Exercise To Workout List Item

type WorkoutExercise = ExerciseInfo & {
    workout_id:number;
}

const AddExerciseCard = ({id,name,workout_id}:WorkoutExercise) => {
  const router = useRouter();
  
  return (
    <TouchableOpacity className='bg-dark-200 
                                 rounded-md border-2 border-[rgba(255,255,255,0.05)] 
                                 items-center self-center' 
                      style={{paddingVertical:12, width:'90%', marginTop:10}}
                      onPress={()=>router.push({pathname: `/exercise_add/${id}`,
                                            params: {workout_id:workout_id}})}>
      <Text className='text-white text-2xl font-md'>{name}</Text>
    </TouchableOpacity>
  )
}

export default AddExerciseCard;