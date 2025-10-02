interface TwoRows {
    //workout and exercise only have name and id
    id: number;
    name: string;
}

interface DetailedExercise {
    id: number;
    name: string;
    set_number: number;
}

interface Session {
    id: number;
    workout_id: number;
    time_started: number;
    time_ended: number;
}

interface SessionSet {
    set_id: number;
    session_exercise_id: number;
    set_number: number;
    weight: number;
    reps: number;


}


type SetData = {
    set: number;
    weight: number;
    reps: number;

}


type SessionState = {
    workoutId: number | null;
    sessionId: number | null;
    exercises: ExerciseData[];
    startSession: (workoutId:number)=>void;
    endSession: ()=>void;
    reset: ()=>void;
}

// Fine grained

export interface ExerciseTemplate {
    id:number;
    name:string;
    set_number: number;
}

export interface WorkoutTemplate {
    id:number;
    name: string
    exercises: ExerciseTemplate[]
}

