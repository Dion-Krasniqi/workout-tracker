interface TwoRows {
    //workout and exercise only have name and id
    id: number;
    name: string;
}

interface Session {
    id: number;
    workout_id: number;
    time_started: number;
    time_ended: number;
}
