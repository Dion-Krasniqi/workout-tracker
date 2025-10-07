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






// Fine grained
export interface ExerciseInfo {
    id: number;
    name: string;
}
export interface ExerciseTemplate {
    id:number;
    exercise_id:number;
    name:string;
    set_number: number;
}

export interface WorkoutTemplate {
    id:number;
    name: string
    exercises: ExerciseTemplate[]
}

export interface SessionSet {
    id:number;
    session_exercise_id:number;
    set_number:number;
    weight:number;
    reps:number;
}

export interface SessionExercise {
    id:number;
    session_id:number;
    exercise_id:number;
    name: string;
    sets: SessionSet[];
}

export interface Session {
    id:number;
    session_name:string;
    workout_id:number;
    start_time:number;
    end_time?:number;
    exercises: SessionExercise[];
    active?:boolean;
    
}

export interface SetData {
    weight:number;
    reps:number;
}