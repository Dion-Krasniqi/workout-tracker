import { addExerciseToWorkout, createCustomWorkout, getAllExercises, getWorkoutExercises, loadWorkouts } from '@/app/db/queries';
import { ExerciseTemplate, WorkoutTemplate } from '@/interfaces/interfaces';
import { create } from 'zustand';


export const useStore = create<{
    count:number;
    increment: ()=>void;
}>((set)=>({
    count:0,
    increment: ()=> set((state) =>({count: state.count + 1})),
}))


interface WorkoutStore {
    workouts: WorkoutTemplate[];
    loading: boolean;
    loadWorkouts: ()=> Promise<void>;
    addWorkout: (workout_name: string)=> Promise<number>;
    addExerciseToWorkout: (workout_id:number,exercise_id:number,exercise_name:string, set_number:number) => void;
    loadExercises: (workout_id:number) => Promise<void>;
}


export const useWorkoutStore = create<WorkoutStore>((set)=>({
    workouts:[],
    loading: true,
    loadWorkouts: async()=> {
        const result = await loadWorkouts();
        set({workouts:result, loading:false});
    },
    addWorkout: async(workout_name:string)=> {
        const id = await createCustomWorkout(workout_name);
        const newWorkout = {id:id, name:workout_name, exercises: []};
        set((state)=>({
            workouts: [ ...state.workouts, newWorkout ],
        }))
        return id;
        
    },
    addExerciseToWorkout: async(workout_id,exercise_id,exercise_name,set_number)=>{
        const id = await addExerciseToWorkout(workout_id, exercise_id, set_number)
        const newExercise = {id:id, name:exercise_name, set_number:set_number}
        set((state)=>({
            workouts: state.workouts.map((w)=>w.id==workout_id ? 
                                              {...w, exercises:[...w.exercises,newExercise]} :
                                              w)
        }))

    },
    loadExercises: async(workout_id)=>{
        const exercises = await getWorkoutExercises(workout_id);
        set((state)=>({
            workouts: state.workouts.map((w)=>w.id==workout_id ?
                                             {...w, exercises:exercises}:
                                              w)
        }))
    },
}));

interface ExerciseStore {

}