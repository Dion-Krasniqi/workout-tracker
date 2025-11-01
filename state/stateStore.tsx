import { addExerciseToWorkout, changeWorkoutName, createCustomWorkout, createSession, deleteAllSessions, deleteSession, getAllSessions, getNotes, getSetData, getWorkoutExercises, loadWorkouts, removeExercise, reorderExercise, writeNotes, writeSet } from '@/app/db/queries';
import { ExerciseTemplate, Session, WorkoutTemplate } from '@/interfaces/interfaces';
import { Alert } from 'react-native';
import { create } from 'zustand';



interface WorkoutStore {
    workouts: WorkoutTemplate[];
    loading: boolean;
    changeName: (workout_id:number,name:string)=>void;
    loadWorkouts: ()=>Promise<void>;
    addWorkout: (workout_name: string)=>Promise<number>;
    addExerciseToWorkout: (workout_id:number,exercise_id:number,exercise_name:string, set_number:number) =>void;
    removeExerciseFromWorkout:(workout_id:number,exercise_id:number) => void;
    loadExercises: (workout_id:number) =>Promise<void>;
    changeOrder:(workout_id:number, exercise_id:number,new_index:number,old_index:number) => void;
}


export const useWorkoutStore = create<WorkoutStore>((set,get)=>({
    workouts:[],
    loading: true,
    changeName: async(workout_id,name) =>{
        set((state)=>({
            workouts: state.workouts.map((w)=>w.id==workout_id ? 
                                              {...w, name:name} :
                                              w)
        }))
        await changeWorkoutName(workout_id,name);

    },
    loadWorkouts: async()=> {
        const result = await loadWorkouts();
        set({workouts:result, loading:false});
    },
    addWorkout: async(workout_name:string)=> {
        const state = get(); 
        if (state.workouts.find(w => w.name == workout_name)){
            Alert.alert('Workout with this name already exists!')
            return -2;
        }
        const id = await createCustomWorkout(workout_name);
        const newWorkout = {id:id, name:workout_name, exercises: []};
        set((state)=>({
            workouts: [ ...state.workouts, newWorkout ],
        }))
        return id;
        
    },
    addExerciseToWorkout: async(workout_id,exercise_id,exercise_name,set_number)=>{
        const state = get(); 
        const workout = state.workouts.find(w => w.id == workout_id);
        const lastOrder = workout?.exercises.at(-1)?.order_index ?? 0;
        const order_index = lastOrder + 1;
        const id = await addExerciseToWorkout(workout_id, exercise_id, set_number,order_index);
        const newExercise = {id:id, exercise_id:exercise_id, name:exercise_name, set_number:set_number, order_index:order_index};
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
    changeOrder: async(workout_id,exercise_id,new_index,old_index)=>{
        const state = get();
        const workout = state.workouts.find(w => w.id == workout_id);
        const other_id = (workout?.exercises.find(e => e.order_index === new_index))?.id;
        //sort to update the flatlist
        set((state)=>({
            workouts: state.workouts.map((w)=>w.id==workout_id ? 
                                         {...w, exercises: w.exercises.map((e)=> e.id == other_id ? { ...e, order_index: old_index }
              : e.id == exercise_id ? { ...e, order_index: new_index } : e ).sort((a, b) => a.order_index - b.order_index),} : w),}));
        //@ts-ignore
        reorderExercise(exercise_id,new_index,old_index,other_id);
    },

}));



interface SessionStore {
    previousSessions: Session[];
    activeSession: Session | null;
    finishedSession: Session | null;
    loading: boolean;
    loadingsessions: boolean;
    loadPreviousSessions: ()=>void;
    deletePreviousSessions: ()=>void;
    findPreviousSessions: (session_string:string)=>Session[]|null;
    setPreviousSession: (session_id:number)=>void;
    loadPreviousSession: (session_id:number)=>void;
    deletePreviousSession:(session_id:number)=>void;
    startSession: (workout_id:number)=>Session;
    endSession: ()=>void;
    quitSession: ()=>void;
    loadActiveExercisesWithSets: (workout_id:number, session_id:number)=>Promise<void>;
    updateNotes: (exercise_id:number,content:string)=>void;
    updateSet: (set_id:number, weight:number, reps:number)=>void;
    //removeSet: (set_id:number)=>void;
}

export const useSessionStore = create<SessionStore>((set, get)=>({
    previousSessions: [],
    activeSession: null,
    finishedSession: null,
    loading: true,
    loadingsessions: true,
    //reads all entries in the sessions table 
    loadPreviousSessions: async()=>{
        const sessions = await getAllSessions();
        set({previousSessions:[...sessions],loadingsessions:false});
        
        

    },
    deletePreviousSessions: async()=>{
        Alert.alert('This will delete all data','Do you wish to proceed?',
            [{text: 'Cancel',onPress: () => {},style: 'cancel',},
             { text: 'YES', onPress: async() => {
                set({previousSessions:[],});
                await deleteAllSessions();
             } },],
             { cancelable: false });
        
    },
    findPreviousSessions: (session_string)=>{
        console.log('ran');
        const {previousSessions} = get();
        if (!previousSessions) return null;

        const S = previousSessions.filter((s)=>s.session_name.includes(session_string));
        if (!S) return null;
        const fSessions: Session[] = S;

        return fSessions;
    },
    setPreviousSession: (session_id)=>{
        const { finishedSession } = get();
        if (finishedSession?.id == session_id){
            return
        }
        if (finishedSession) {
            set({finishedSession:null});
        }
        const { previousSessions } = get();
        const s = previousSessions.find((s)=>s.id==Number(session_id));
        set({finishedSession:s});

    },
    loadPreviousSession: async(session_id)=>{

        const { finishedSession } = get();
        
        const w_id = finishedSession?.workout_id
        const workoutStore = useWorkoutStore.getState();

        if (workoutStore.workouts.length == 0){
            await workoutStore.loadWorkouts();
        }
        const workout = workoutStore.workouts.find((w)=>w.id==w_id)
        if (!workout){
            //do something
            return;
        }
        if(w_id){
            await useWorkoutStore.getState().loadExercises(w_id);
        }
        if (!finishedSession) return;
        
        console.log(finishedSession.setNumber);
        let setId = 1;   
        const sessionExercises = await Promise.all(
            
            workout.exercises.map(async(ex,index)=>{
            
            const SessionExerciseId = ex.id;
            const notes = await getNotes(ex.exercise_id);
            
            const sets = await Promise.all(Array.from({length:ex.set_number}, async(_, i)=>{
                finishedSession.setNumber++;
                const result = await getSetData(ex.exercise_id,i+1);
                setId=setId+1;
                return {
                    id: setId,
                    session_exercise_id: SessionExerciseId,
                    set_number: i + 1,
                    weight:result?.weight,
                    reps:result?.reps,
                    oldWeight:result?.weight,
                    oldReps:result?.reps,
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
                oldNotes:notes,
            };
        }));
        set({finishedSession:{...finishedSession,session_name:workout.name, exercises: sessionExercises},loading:false});

    },
    deletePreviousSession: async(session_id)=>{
        
        set({finishedSession:null,});
        await deleteSession(session_id);

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
            setNumber:0,
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
                await writeSet(ex.exercise_id,actual_id,set.set_number,set.weight,Number(set.reps),activeSession.time_started);
            })
        })
        set({previousSessions:[...previousSessions,finishedSession],
            activeSession:null,
        })

        
    },
    //nulls out activesession
    quitSession: async()=> {
        const { activeSession } = get();
        if(activeSession){set({activeSession:null})};
        

    },
    // loads exercises using WorkoutStore and workout id, then creates the session exercise instances and sets arrays
    // of exercises based on set_number set at the exercise table
    loadActiveExercisesWithSets: async(workout_id, session_id)=>{

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
                activeSession.setNumber++;
                const result = await getSetData(ex.exercise_id,i+1);
                // this should give unique temp ids
                setId=setId+1;
                return {
                    id: setId,
                    session_exercise_id: SessionExerciseId,
                    set_number: i + 1,
                    weight:0,
                    reps:0,
                    oldWeight:result?.weight,
                    oldReps:result?.reps,
                }
                
            }));
            setId = setId + 1;
            return {
                id: SessionExerciseId,
                session_id,
                exercise_id: ex.exercise_id,
                name: ex.name,
                sets,
                notes:'',
                oldNotes:notes,

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
