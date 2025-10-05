import { addExerciseToWorkout, createCustomWorkout, getAllExercises, getWorkoutExercises, loadWorkouts } from '@/app/db/queries';
import { ExerciseTemplate, Session, WorkoutTemplate } from '@/interfaces/interfaces';
import { act } from 'react';
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
        const newExercise = {id:id, exercise_id:exercise_id, name:exercise_name, set_number:set_number}
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
    loading: boolean;
    startSession: (workout_id:number)=>Session;
    endSession: ()=>void;
    loadExercisesWithSets: (workout_id:number, session_id:number)=>Promise<void>;
    updateSet: (set_id:number, weight:number, reps:number)=>void;
    //removeSet: (set_id:number)=>void;
}

export const useSessionStore = create<SessionStore>((set, get)=>({
    activeSession: null,
    loading: true,
    // starts session with a dummy id and sets start_time to when called and defaults exercises object to empty array
    // then assigns session object to activeSession
    startSession: (workout_id)=>{
        const newSession: Session = {
            id: Date.now(),
            workout_id: workout_id,
            start_time:Date.now(),
            exercises: [],
        };
        set({activeSession:newSession});
        return newSession;
    },

    endSession: ()=>{
        const { activeSession } = get();
        if(!activeSession) return;

        set({activeSession:{...activeSession,end_time:Date.now(),}});
        //put it inside db
    },
    // loads exercises using WorkoutStore and workout id, then creates the session exercise instances and sets arrays
    // of exercises based on set_number set at the exercise table
    loadExercisesWithSets: async(workout_id, session_id)=>{
        const workoutStore = useWorkoutStore.getState();
        // not really working
        if (workoutStore.workouts.length == 0){
            await workoutStore.loadWorkouts();
        }
        const workout = workoutStore.workouts.find((w)=>w.id==workout_id)
        if (!workout){
            return;
        }
        await useWorkoutStore.getState().loadExercises(workout_id)
        console.log(workout?.exercises)
        const { activeSession } = get();
        if (!activeSession) return;

        const sessionExercises = workout.exercises.map((ex,index)=>{
            const SessionExerciseId = Date.now() + index;

            const sets = Array.from({length:ex.set_number}, (_, i)=>({
                id: SessionExerciseId + i + 1,
                session_exercise_id: SessionExerciseId,
                set_number: i + 1,
                weight: 0,
                reps: 0,


            }));

            return {
                id: SessionExerciseId,
                session_id,
                exercise_id: ex.exercise_id,
                name: ex.name,
                sets: sets,

            };
        });

        set({activeSession:{...activeSession,exercises: sessionExercises},loading:false});
        
       
    },
    // updates set object and reloads exercise array
    updateSet: async(set_id, weight, reps)=>{

        set((state)=>{
            if (!state.activeSession) return state;

            const updatedExercises = state.activeSession.exercises.map((ex)=>({
                ...ex,
                sets: ex.sets.map((s)=>s.id==set_id ? {...s, weight, reps} : s),
            }));
            return {...state, activeSession: {...state.activeSession, exercises: updatedExercises},};


        });

    },

}))
