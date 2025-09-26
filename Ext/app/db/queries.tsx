import db from "./db";

export const createCustomWorkout = async (workout_name:string) => {
    await db.runAsync(`INSERT INTO workouts (name) VALUES ('${workout_name}');`)

}

export const createCustomExercise = async (exercise_name:string) => {
    await db.runAsync(`INSERT INTO exercises_info (name) VALUES ('${exercise_name}');`)

}

export const getExercise = async () => {
    const allRows = await db.getAllAsync('SELECT * FROM exercises_info');
    for (const row of allRows) {
      //@ts-ignore
        console.log(row.id, row.name);
    }
}

export const getAllWorkoutTemplates = async () => {
    const allRows = await db.getAllAsync<Workout>('SELECT * FROM workouts');
    
    return allRows;

}