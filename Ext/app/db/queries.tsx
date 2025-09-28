import db from "./db";

export const createCustomWorkout = async (workout_name:string) => {
    await db.runAsync(`INSERT INTO workouts (name) VALUES ('${workout_name}');`)

}

export const createCustomExercise = async (exercise_name:string) => {
    await db.runAsync(`INSERT INTO exercises_info (name) VALUES ('${exercise_name}');`)

}

export const getExercise = async (id:number) => {
    const exerciseInfo = await db.getFirstAsync<TwoRows>(`SELECT * FROM exercises_info WHERE id='${id}'`);
    return exerciseInfo;
}

export const getAllExercises = async () => {
    const allRows = await db.getAllAsync<TwoRows>('SELECT * FROM exercises_info');
    
    return allRows;

}

export const getAllWorkoutTemplates = async () => {
    const allRows = await db.getAllAsync<TwoRows>('SELECT * FROM workouts');
    
    return allRows;

}

export const startSession = async (workout_name:string) => {
    try {
        const workoutInfo = await db.getFirstAsync(`SELECT * FROM workouts WHERE name='${workout_name}'`);
        console.log(workoutInfo);
        //@ts-ignore
        const workout_id = workoutInfo.id;
        const start = Date.now();
        await db.runAsync(`INSERT INTO sessions (workout_id, time_started) VALUES (${workout_id}, ${start});`);
        console.log(await db.getAllAsync(`SELECT * FROM sessions`));
    } catch (error) {
        console.log('Couldnt find workout')
    }
    
    
    
    
}