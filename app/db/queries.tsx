import { ExerciseInfo, Session, WorkoutTemplate } from "@/interfaces/interfaces";
import db from "./db";

//Exercise Related
export const getAllGroups = async () => {
    const allRows = await db.getAllAsync('SELECT * FROM muscle_groups');
}

export const getAllExercises = async () => {
    const allRows = await db.getAllAsync('SELECT * FROM exercises_info');
    return allRows;
}

export const getAllExercisesSearch = async (name:string, group?:number) => {
    if (group) {
        const allRows = await db.getAllAsync(`SELECT ex.id, ex.name, ex.muscle_group 
                                          FROM exercises_info as ex
                                          JOIN muscle_groups m ON ex.muscle_group = m.id
                                          WHERE ex.name LIKE ?  AND ex.muscle_group=?
                                          `, [`${name}%`,group+1]);
        return allRows;
    } else {
        const allRows = await db.getAllAsync(`SELECT ex.id, ex.name, ex.muscle_group 
                                          FROM exercises_info as ex
                                          JOIN muscle_groups m ON ex.muscle_group = m.id
                                          WHERE ex.name LIKE  ?
                                          `, [`${name}%`]);
        return allRows;
    }
}

export const getAllExerciseInstances = async () => {
    const allRows = await db.getAllAsync('SELECT * FROM exercises');
}

export const createCustomExercise = async (exercise_name:string, muscle_group_id:number) => {
    await db.runAsync(`INSERT INTO exercises_info (name,muscle_group) VALUES (?,?);`, exercise_name, muscle_group_id);
}

export const getExercise = async (id:number) => {
    const exerciseInfo = await db.getFirstAsync<ExerciseInfo>(`SELECT * FROM exercises_info WHERE id='${id}'`);
    return exerciseInfo;
}

//Workout Related
export const addExerciseToWorkout = async (workout_id:number, exercise_id:number,set_number:number,order_index:number): Promise<number> => {
    const result = await db.runAsync(`INSERT INTO exercises (workout_id,exercise_id,set_number,order_index) VALUES (?,?,?,?)`,
                                                             workout_id,exercise_id,set_number,order_index);
    return result.lastInsertRowId as number;
}

export const changeSetNumber = async(exercise_id:number,set_number:number)=> {
    await db.runAsync(`UPDATE exercises 
                       SET set_number = (?)
                       WHERE id = (?);`, set_number,exercise_id);
};

//Possibly do this in one
export const reorderExercise = async(exercise_id:number,order_index:number,old_index:number,other_id:number)=> {
    await db.runAsync(`UPDATE exercises 
                       SET order_index = (?)
                       WHERE id = (?);`, order_index,exercise_id);
    await db.runAsync(`UPDATE exercises 
                       SET order_index = (?)
                       WHERE id = (?);`, old_index,other_id); 
}

export const removeExercise = async (exercise_id:number): Promise<number> => {
    const result = await db.runAsync(`DELETE FROM exercises 
                                      WHERE id = ?`, exercise_id);
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
    const result = await  db.getAllSync(`
        SELECT ex.id, ex.exercise_id, ef.name, ex.set_number, ex.order_index 
        FROM exercises ex 
        JOIN exercises_info ef ON ex.exercise_id = ef.id 
        WHERE ex.workout_id = ?
        ORDER BY order_index;`, [id]);
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

export const changeWorkoutName = async(workout_id:number,name:string)=>{
    await db.runAsync(`UPDATE workouts
                       SET name = (?)
                       WHERE id = (?);`, 
                       name,workout_id);
}

//Session Related
export const getSessionById = async (id:number) => {
    const sessionInfo = await db.getFirstAsync(`SELECT * FROM sessions WHERE id=?`,[id]);
    return sessionInfo;
}

export const getAllSessions = async():Promise<Session[]> => {
    const allRows = await db.getAllAsync<Session>(`SELECT * 
                                                  FROM sessions
                                                  WHERE id > -1
                                                  ORDER BY id DESC`);
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

export const deleteSession = async(session_id:number)=>{
    await db.runAsync(`DELETE FROM sessions 
                       WHERE id = (?)`, session_id);
}

export const getMonthSession = async()=> {
    const amount = await db.getFirstAsync<{count:Number}>(`SELECT COUNT(*) AS count 
                                           FROM sessions
                                           WHERE strftime('%m', time_started/1000, 'unixepoch')=strftime('%m','now')`);
    return amount?.count || 0;

}

export const getMostCommon = async()=> {
    const workout = await db.getFirstAsync<{name:string,count:number}>(`SELECT w.name as name, COUNT(*) AS count
                                            FROM sessions s JOIN workouts w ON w.id=s.workout_id
                                            GROUP BY w.id
                                            ORDER BY count DESC`);
    if(!workout) return 'No Workout Found';
    return workout.name || 'No Workout Found';
}

//Notes
export const getAllNotes = async()=>{
    // probably define a type here
    const result = await db.getAllAsync(`SELECT *
                                         FROM notes
                                         ORDER BY id DESC`);
    return result;
}

//maybe sets like this
export const getNotes = async(exercise_id:number, session_id?:number)=>{
    let result = null;
    if (session_id){
        result = await db.getFirstAsync<{content:string}>(`SELECT content 
                                          FROM notes
                                          WHERE ex_id = ? AND session_id = ?
                                          ORDER BY id DESC`, [exercise_id, session_id]);
    } else {
        result = await db.getFirstAsync<{content:string}>(`SELECT content 
                                          FROM notes
                                          WHERE ex_id = ?
                                          ORDER BY id DESC`, [exercise_id]); 
    }
    if (result == null) return 'Notes';
    const {content} = result;
    return content; 
}

export const writeNotes = async(exercise_id:number,content:string, session_id:number)=>{
    if (content.trim()==''){
        await db.runAsync(`INSERT INTO notes (ex_id,content,session_id) VALUES (?,?,?)`,[exercise_id,'Notes', session_id]);
        return;
    }
    
    await db.runAsync(`INSERT INTO notes (ex_id,content,session_id) VALUES (?,?,?)`,[exercise_id,content, session_id]);
    
}

// Set Related
export const writeSet = async (exercise_id:number,session_id:number,set_number:number,weight:number,reps:number,date:number,marked?:boolean)=>{
    
    if (marked){
        await db.runAsync(`INSERT INTO session_sets (exercise_id,session_id,set_number,weight,reps,date,marked) VALUES (?,?,?,?,?,?,?)`,
                                                                          [exercise_id,session_id,set_number,weight,reps,date,marked]);
        return;
        
    } else if (weight==0 || reps==0){
        // if not marked and reps or weight 0, doesnt save
        return
    }
    await db.runAsync(`INSERT INTO session_sets (exercise_id,session_id,set_number,weight,reps,date) VALUES (?,?,?,?,?,?)`,
                                                                          [exercise_id,session_id,set_number,weight,reps,date]);

}

export const getAllSets = async() => {
    const allRows = await db.getAllAsync('SELECT * FROM session_sets');
}

// gotta be simpler
export const getSetData = async(exercise_id:number, set_number:number, session_id?:number): Promise<{weight:number;reps:number;}>=>{
    if ( !session_id ){
        const result = await db.getFirstAsync<{weight:number;reps:number}>(`SELECT weight, reps
                                                                            FROM session_sets 
                                                                            WHERE exercise_id = ? AND set_number = ?
                                                                            ORDER BY id DESC`, [exercise_id,set_number]);
        if (!result)return {weight:0,reps:0};
    const {weight,reps} = result;
    return {weight,reps};
    } else {
        const result = await db.getFirstAsync<{weight:number;reps:number}>(`SELECT weight, reps
                                                                            FROM session_sets 
                                                                            WHERE exercise_id = ? AND set_number = ? AND session_id = ?
                                                                            ORDER BY id DESC`,
                                                                            [exercise_id,set_number, session_id]);
        if (!result)return {weight:0,reps:0} 
    const {weight,reps} = result;
    return {weight,reps};
    }
}

export const getAllExerciseSets = async(exercise_id:number)=>{
    const result = await db.getAllAsync<{weight:number;reps:number;date:number;marked?:boolean}>(`SELECT weight, reps, date, marked 
                                         FROM session_sets
                                         WHERE exercise_id = ?
                                         ORDER BY id DESC`, [exercise_id]);
    return result;
}
export const getAllSetsSession = async(session_id:number)=>{
    const result = await db.getAllAsync<{id:number;exercise_id:number;weight:number;reps:number;date:number;}>(
                                        `SELECT id, exercise_id, weight, reps, date
                                         FROM session_sets
                                         WHERE session_id = ?`, [session_id]);
    console.log(result)
    return result;
}

// backup data stuff

export const backupSession = async(workout_id:number,session_name:string,time_started:number)=>{
    const backupSession = await db.runAsync(` UPDATE sessions
                                              SET workout_id = ?, session_name = ?, time_started = ?
                                              WHERE id=-1`,
                                                                [workout_id,session_name,time_started]);
}

export const getSavedSession = async()=>{
    const result = await db.getFirstAsync<Session>(`SELECT * FROM sessions WHERE id=-1`);
    console.log('called');
    return result;
}

export const deleteSavedLeftovers = async()=>{
    await db.runAsync(`DELETE
                       FROM session_sets
                       WHERE session_id = -1`);
    await db.runAsync(`DELETE
                       FROM notes
                       WHERE session_id = -1`);
}