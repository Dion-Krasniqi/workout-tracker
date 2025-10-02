import { loadWorkouts } from '@/app/db/queries';
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
    loadWorkouts: ()=> Promise<void>;
}

export const useWorkoutStore = create<WorkoutStore>((set)=>({
    workouts:[],
    loadWorkouts: async()=> {
        const result = await loadWorkouts();
        set({workouts:result});
    },
}));