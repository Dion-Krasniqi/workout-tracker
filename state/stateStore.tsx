import { addExerciseToWorkout, createCustomWorkout, createSession, deleteAllSessions, getAllSessions, getNotes, getSetData, getWorkoutExercises, loadWorkouts, removeExercise, writeNotes, writeSet } from '@/app/db/queries';
import { ExerciseTemplate, Session, WorkoutTemplate } from '@/interfaces/interfaces';
import { Alert } from 'react-native';
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
    loadWorkouts: ()=>Promise<void>;
    addWorkout: (workout_name: string)=>Promise<number>;
    addExerciseToWorkout: (workout_id:number,exercise_id:number,exercise_name:string, set_number:number) =>void;
    removeExerciseFromWorkout:(workout_id:number,exercise_id:number) => void;
    loadExercises: (workout_id:number) =>Promise<void>;
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
        const id = await addExerciseToWorkout(workout_id, exercise_id, set_number);
        const newExercise = {id:id, exercise_id:exercise_id, name:exercise_name, set_number:set_number};
        set((state)=>({
            workouts: state.workouts.map((w)=>w.id==workout_id ? 
                                              {...w, exercises:[...w.exercises,newExercise]} :
                                              w)
        }))

    },
    removeExerciseFromWorkout:async(workout_id,exercise_id) => {
        const id = await removeExercise(exercise_id);
        set((state)=>({
            workouts: state.workouts.map((w)=>w.id==workout_id ? 
                                              {...w, exercises:w.exercises.filter((ex)=>ex.id !=exercise_id)} :
                                              w)
        }))
    },
    loadExercises: async(workout_id)=>{
        const exercises = await getWorkoutExercises(workout_id) as ExerciseTemplate[];
        set((state)=>({
            workouts: state.workouts.map((w)=>w.id==workout_id ?
                                             {...w, exercises:exercises}:
                                              w)
        }))
    },
}));



interface SessionStore {
    previousSessions: Session[];
    activeSession: Session | null;
    loading: boolean;
    loadPreviousSession: ()=>void;
    deletePreviousSessions: ()=>void;
    startSession: (workout_id:number)=>Session;
    endSession: ()=>void;
    quitSession: ()=>void;
    loadExercisesWithSets: (workout_id:number, session_id:number)=>Promise<void>;
    updateNotes: (exercise_id:number,content:string)=>void;
    updateSet: (set_id:number, weight:number, reps:number)=>void;
    //removeSet: (set_id:number)=>void;
}

export const useSessionStore = create<SessionStore>((set, get)=>({
    previousSessions: [],
    activeSession: null,
    loading: true,
    //reads all entries in the sessions table 
    loadPreviousSession: async()=>{
        const sessions = await getAllSessions();
        const {previousSessions} = get();
        set({previousSessions:[...sessions],});
        

    },
    deletePreviousSessions: async()=>{
        const {previousSessions} = get();
        set({previousSessions:[],});
        await deleteAllSessions();
    },
    // starts session with a dummy id and sets start_time to when called and defaults exercises object to empty array
    // then assigns session object to activeSession
    startSession: (workout_id)=>{
        const { activeSession } = get();
        // if yes nulls out session, then new start session proceeds as usual
        if(activeSession){
            Alert.alert('Session already active','Do you want to start a new workout?',
            [{text: 'Cancel',onPress: () => {},style: 'cancel',},
             { text: 'YES', onPress: () => ({activeSession:null}) },],
             { cancelable: false });

        }
        const newSession: Session = {
            id: Date.now(),
            session_name: `Session ${Date.now()}`,
            workout_id: workout_id,
            time_started:Date.now(),
            exercises: [],
        };
        set({activeSession:newSession});
        return newSession;
    },

    endSession: async()=>{
        const { activeSession, previousSessions } = get();
        if(!activeSession) return;

        //add end time not directly to active sesh
        const finishedSession = {...activeSession, time_ended:Date.now()}
        
        //save to db
        const actual_id = await createSession(finishedSession.workout_id,
                                             finishedSession.session_name,
                                             finishedSession.time_started,
                                             finishedSession.time_ended);
        
        //add to prev session array, nullify active session
        activeSession.exercises.forEach((ex)=>{
            writeNotes(ex.exercise_id,ex.notes);
            
            
            ex.sets.forEach(async(set)=>{
                await writeSet(ex.exercise_id,actual_id,set.set_number,set.weight,Number(set.reps));
            })
        })
        set({previousSessions:[...previousSessions,finishedSession],
            activeSession:null,
        })

        
    },
    quitSession: async()=>{
        const { activeSession } = get();
        // if yes nulls out session, then new start session proceeds as usual
        if(activeSession){
            Alert.alert('Session information will be lost','Do you wish to proceed?',
            [{text: 'Cancel',onPress: () => {},style: 'cancel',},
             { text: 'YES', onPress: () => ({activeSession:null}) },],
             { cancelable: false });

        }

    },
    // loads exercises using WorkoutStore and workout id, then creates the session exercise instances and sets arrays
    // of exercises based on set_number set at the exercise table
    loadExercisesWithSets: async(workout_id, session_id)=>{

        const workoutStore = useWorkoutStore.getState();

        if (workoutStore.workouts.length == 0){
            await workoutStore.loadWorkouts();
        }
        const workout = workoutStore.workouts.find((w)=>w.id==workout_id)
        if (!workout){
            //do something
            return;
        }
        await useWorkoutStore.getState().loadExercises(workout_id)
        const { activeSession } = get();
        if (!activeSession) return;
        //dummy set Id so the updateSet can access
        let setId = 1
        const sessionExercises = await Promise.all(
            
            workout.exercises.map(async(ex,index)=>{
            const SessionExerciseId = ex.id;
            const notes = await getNotes(ex.exercise_id);
            console.log('this shi',notes,ex.exercise_id);
            
            const sets = await Promise.all(Array.from({length:ex.set_number}, async(_, i)=>{
                const result = await getSetData(ex.exercise_id,i+1);
                // this should give unique temp ids
                setId=setId+1;
                return {
                    id: setId,
                    session_exercise_id: SessionExerciseId,
                    set_number: i + 1,
                    weight:result?.weight,
                    reps:result?.reps,
                }
                
            }));
            setId = setId + 1;
            return {
                id: SessionExerciseId,
                session_id,
                exercise_id: ex.exercise_id,
                name: ex.name,
                sets,
                notes:notes,

            };
        }));
        

        set({activeSession:{...activeSession,session_name:workout.name, exercises: sessionExercises},loading:false});
        
       
    },
    // updates set object and reloads exercise array
    updateSet: async(set_id, weight, reps)=>{

        set((state)=>{
            if (!state.activeSession) return state;

            const updatedExercises = state.activeSession.exercises.map((ex)=>({
                ...ex,
                sets: ex.sets.map((s)=>s.id==set_id ? {...s, weight, reps} : s),
            }));
            return {...state, activeSession: {...state.activeSession, exercises: updatedExercises},loading:false};


        });

    },
    updateNotes: async(exercise_id,content)=>{
        console.log('legit',content);

        set((state)=>{
            if (!state.activeSession) return state;

            const updatedExercises = state.activeSession.exercises.map((ex)=>ex.exercise_id==exercise_id ? {...ex,notes:content} : ex);

            return {...state, activeSession: {...state.activeSession, exercises: updatedExercises},};


        });
        
    },

}))
