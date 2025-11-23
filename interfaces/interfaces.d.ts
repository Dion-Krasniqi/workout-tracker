

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
    order_index:number;
    marked?:boolean;
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
    oldWeight:number;
    oldReps:number;
}

export interface SessionExercise {
    id:number;
    session_id:number;
    exercise_id:number;
    name: string;
    sets: SessionSet[];
    notes: string;
    oldNotes: string;
    marked?:boolean;
}

export interface Session {
    id:number;
    session_name:string;
    workout_id:number;
    time_started:number;
    time_ended?:number;
    exercises: SessionExercise[];
    setNumber:number;
    active?:boolean;
    timer?:number;
    running?:boolean;
    
}

export interface extractedSet {
    id:string;
    session_id:string;
    number:number;
    weight:number;
    reps:number;
    date:Date;
    name:string
}