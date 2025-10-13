import { ExerciseInfo, Session, WorkoutTemplate } from "@/interfaces/interfaces";
import db from "./db";


//Exercise Related
export const getAllGroups = async () => {
    const allRows = await db.getAllAsync('SELECT * FROM muscle_groups');
    console.log(allRows);
}
export const getAllExercises = async () => {
    const allRows = await db.getAllAsync('SELECT * FROM exercises_info');
    return allRows;

}
export const createCustomExercise = async (exercise_name:string, muscle_group_id:number) => {
    await db.runAsync(`INSERT INTO exercises_info (name,muscle_group) VALUES (?,?);`, exercise_name, muscle_group_id);

}

export const getExercise = async (id:number) => {
    const exerciseInfo = await db.getFirstAsync<ExerciseInfo>(`SELECT * FROM exercises_info WHERE id='${id}'`);
    return exerciseInfo;
}



//Workout Related

export const addExerciseToWorkout = async (workout_id:number, exercise_id:number,set_number:number): Promise<number> => {
    const result = await db.runAsync(`INSERT INTO exercises (workout_id,exercise_id,set_number) VALUES (?,?,?)`,
                                                                          workout_id,exercise_id,set_number);
    const test = await db.getAllSync('SELECT * FROM exercises');
    console.log(test);
    return result.lastInsertRowId as number;
}
export const removeExercise = async (exercise_id:number): Promise<number> => {
    const result = await db.runAsync(`DELETE FROM exercises 
                                      WHERE id = ?`, exercise_id);
    const test = await db.getAllSync('SELECT * FROM exercises');
    console.log(test);
    return result.lastInsertRowId as number;
}

export const getAllWorkouts= async () => {
    const allRows = await db.getAllAsync<WorkoutTemplate>('SELECT * FROM workouts');
    return allRows;
}

export const createCustomWorkout = async (workout_name:string): Promise<number> => {
    const result = await db.runAsync(`INSERT INTO workouts (name) VALUES (?);`, [workout_name]);
    return result.lastInsertRowId as number;
}

export const getWorkoutbyId = async (id:number) => {
    const workoutInfo = await db.getFirstAsync(`SELECT * FROM workouts WHERE id=?`,[id]);
    return workoutInfo;
}

export const getWorkoutExercises = async (id:number) => {
    {/*const workoutExercises = await db.getAllAsync(`SELECT * FROM exercises WHERE workout_id=${id}`);
    const detailedExercises = await Promise.all(
        workoutExercises.map(async (value)=>{
            //@ts-ignore
            const exerciseInfo = await getExercise(value?.exercise_id);
            //@ts-ignore
            return {id: value.id, name: exerciseInfo?.name , set_number: value.set_number}
        })
    )
    return detailedExercises as ExerciseTemplate[];*/}
    const result = db.getAllSync(`
        SELECT ex.id, ex.exercise_id, ef.name, ex.set_number 
        FROM exercises ex 
        JOIN exercises_info ef ON ex.exercise_id = ef.id 
        WHERE ex.workout_id = ?;`, [id]);
    return result
    
}

export const loadWorkouts = async (): Promise<WorkoutTemplate[]> => {
    const workoutReferences = await db.getAllAsync<{id:number;name:string}>('SELECT * FROM workouts');

    const workouts : WorkoutTemplate[] = workoutReferences.map(workout =>({
        id: workout.id,
        name: workout.name,
        exercises: [],
    }));

    return workouts;

}




//Session Related
 

export const getSessionById = async (id:number) => {
    const sessionInfo = await db.getFirstAsync(`SELECT * FROM sessions WHERE id=?`,[id]);
    return sessionInfo;
}

export const getAllSessions = async():Promise<Session[]> => {
    const allRows = await db.getAllAsync<Session>(`SELECT * 
                                                  FROM sessions
                                                  ORDER BY id DESC`);
    console.log(allRows);
    return allRows;   
}
export const createSession = async(workout_id:number, session_name:string, time_started:number, time_ended:number): Promise<number>=>{
    const lastSession = await db.runAsync(`INSERT INTO sessions (workout_id,session_name,time_started,time_ended) VALUES (?,?,?,?)`,
                                                                          [workout_id,session_name,time_started,time_ended]);
    return lastSession.lastInsertRowId as number;
}
export const deleteAllSessions = async()=>{
    await db.getAllAsync(`DELETE FROM sessions;`)
}

//Notes
export const getAllNotes = async()=>{
    const result = await db.getAllAsync(`SELECT *
                                          FROM notes
                                          ORDER BY id DESC`);
    console.log(result);    
}

export const getNotes = async(exercise_id:number)=>{
    const result = await db.getFirstAsync<{content:string}>(`SELECT content 
                                          FROM notes
                                          WHERE ex_id = ?
                                          ORDER BY id DESC`, [exercise_id]);
                                          

    if (!result){
        return 'Notes';
    }
    const {content} = result;
    return content;
}

export const writeNotes = async(exercise_id:number,content:string)=>{
    await db.runAsync(`INSERT INTO notes (ex_id,content) VALUES (?,?)`,[exercise_id,content]);
}


// Set Related


export const writeSet = async (exercise_id:number, session_id:number, set_number:number, weight:number, reps:number)=>{
    await db.runAsync(`INSERT INTO session_sets (exercise_id,session_id,set_number,weight,reps) VALUES (?,?,?,?,?)`,
                                                                          [exercise_id,session_id,set_number,weight,reps]);

}

export const getAllSets = async() => {
    const allRows = await db.getAllAsync('SELECT * FROM session_sets');
    console.log(allRows);   
}

export const getSetData = async(exercise_id:number, set_number:number): Promise<{weight:number;reps:number;}>=>{
    const result = await db.getFirstAsync<{weight:number;reps:number}>(`SELECT weight, reps
                                                                        FROM session_sets 
                                                                        WHERE exercise_id = ? AND set_number = ?
                                                                        ORDER BY id DESC`,[exercise_id,set_number]);
    if (!result){
        return {weight:0,reps:0};
    } 
    const {weight,reps} = result;
    return {weight,reps};


}
export const getAllExerciseSets = async(exercise_id:number)=>{
    const result = await db.getAllAsync<{weight:number;reps:number}>(`SELECT weight, reps 
                                         FROM session_sets
                                         WHERE exercise_id = ?
                                         ORDER BY id DESC`, [exercise_id])
    console.log(result);
    return result;
}