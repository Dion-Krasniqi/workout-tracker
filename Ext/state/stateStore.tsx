import { createCustomWorkout, loadWorkouts } from '@/app/db/queries';
import { WorkoutTemplate } from '@/interfaces/interfaces';
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
}));