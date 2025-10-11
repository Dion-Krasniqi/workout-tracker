





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
    reps:string;
}

export interface SessionExercise {
    id:number;
    session_id:number;
    exercise_id:number;
    name: string;
    sets: SessionSet[];
    notes: string;
}

export interface Session {
    id:number;
    session_name:string;
    workout_id:number;
    time_started:number;
    time_ended?:number;
    exercises: SessionExercise[];
    active?:boolean;
    
}
