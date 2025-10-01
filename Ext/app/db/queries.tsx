import db from "./db";


//Exercise Related
export const getAllGroups = async () => {
    const allRows = await db.getAllAsync<TwoRows>('SELECT * FROM muscle_groups');
    console.log(allRows);
}
export const getAllExercises = async () => {
    const allRows = await db.getAllAsync<TwoRows>('SELECT * FROM exercises_info');
    return allRows;

}
export const createCustomExercise = async (exercise_name:string, muscle_group_id:number) => {
    await db.runAsync(`INSERT INTO exercises_info (name,muscle_group) VALUES (?,?);`, exercise_name, muscle_group_id);

}

export const getExercise = async (id:number) => {
    const exerciseInfo = await db.getFirstAsync<TwoRows>(`SELECT * FROM exercises_info WHERE id='${id}'`);
    return exerciseInfo;
}


//Workout Related

export const addExerciseToWorkout = async (workout_id:number, exercise_id:number,set_number:number) => {
    console.log(workout_id,exercise_id,set_number);
    await db.runAsync(`INSERT INTO exercises (workout_id,exercise_id,set_number) VALUES (?,?,?)`, workout_id,exercise_id,set_number);
                                                                                                     
}

export const getAllWorkoutTemplates = async () => {
    const allRows = await db.getAllAsync<TwoRows>('SELECT * FROM workouts');
    return allRows;
}

export const createCustomWorkout = async (workout_name:string) => {
    const result = await db.runSync(`INSERT INTO workouts (name) VALUES (?);`, [workout_name]);
    return result.lastInsertRowId;
}

export const getWorkoutbyId = async (id:number) => {
    const workoutInfo = await db.getFirstAsync<TwoRows>(`SELECT * FROM workouts WHERE id='${id}'`);
    return workoutInfo;
}

export const getWorkoutExercises = async (id:number) => {
    const workoutExercises = await db.getAllAsync(`SELECT * FROM exercises WHERE workout_id=${id}`);
    
    const detailedExercises = await Promise.all(
        workoutExercises.map(async (value)=>{
            //@ts-ignore
            const exerciseInfo = await getExercise(value?.exercise_id);
            //@ts-ignore
            return {id: value.id, set_number: value.set_number, name: exerciseInfo?.name}
        })
    )
    
    console.log(detailedExercises);
    return detailedExercises;
    
}




//Session Related
export const startSession = async (workout_name:string) => {
    try {
        const workoutInfo = await db.getFirstAsync(`SELECT * FROM workouts WHERE name='${workout_name}'`);
        console.log(workoutInfo);
        //@ts-ignore
        const workout_id = workoutInfo.id;
        const start = Date.now();
        await db.runAsync(`INSERT INTO sessions (workout_id, time_started, time_ended) VALUES (${workout_id}, ${start}, 0);`);
        console.log(await db.getAllAsync(`SELECT * FROM sessions`));
    } catch (error) {
        console.log('Couldnt find workout')
    }
    
    
    
    
}
export const getSessionById = async (id:number) => {
    const sessionInfo = await db.getFirstAsync(`SELECT * FROM sessions WHERE id='${id}'`);
    return sessionInfo;
}

export const getAllSessions = async() => {
    const allRows = await db.getAllAsync<Session>('SELECT * FROM sessions');
    return allRows;
    
}


// Set Related

export const getSetById = async (id:number): Promise<SessionSet | null> => {
    const setInfo = await db.getFirstAsync<SessionSet>(`SELECT * FROM session_sets WHERE id='${id}'`);
    return setInfo;
}
