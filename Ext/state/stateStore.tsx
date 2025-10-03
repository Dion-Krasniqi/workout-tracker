import { addExerciseToWorkout, createCustomWorkout, getAllExercises, getWorkoutExercises, loadWorkouts } from '@/app/db/queries';
import { ExerciseTemplate, Session, WorkoutTemplate } from '@/interfaces/interfaces';
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

interface SessionStore {
    activeSession: Session | null;
    startSession: (workout_id:number)=>void;
    endSession: ()=>void;

    //loadExercises: (exercise_id:number)=>Promise<void>;
    //loadSets: ()=>void;

    //addExerciseToSession: (exercise_id:number, name:string)=>void;
    //addSetToSession: (exercise_id:number, weight:number, reps:number)=>void;
    //updateSet: (set_id:number, weight:number, reps:number)=>void;
    //removeSet: (set_id:number)=>void;
}

export const useSessionStore = create<SessionStore>((set, get)=>({
    activeSession: null,

    startSession: (workout_id)=>{
        const newSession: Session = {
            id: Date.now(),
            workout_id: workout_id,
            start_time:Date.now(),
            exercises: [],
        };
        set({activeSession:newSession});
    },

    endSession: ()=>{
        const { activeSession } = get();
        if(!activeSession) return;

        set({activeSession:{...activeSession,end_time:Date.now(),}});
        //put it inside db
    }

}))
