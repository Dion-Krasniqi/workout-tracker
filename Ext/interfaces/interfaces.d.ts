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