import * as SQLite from 'expo-sqlite';

const db = await SQLite.openDatabaseAsync('workouts.db');


export const initDB = async() => {

    await db.execAsync(
        `CREATE TABLE IF NOT EXISTS workouts(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
        );`
        
    )
    await db.execAsync(
        `CREATE TABLE IF NOT EXISTS exercises(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        workout_id INTEGER NOT NULL,
        name TEXT NOT NULL,
        set_number INTEGER,
        FOREIGN KEY (workout_id) REFERENCES workouts(id)
        );`
        
    )
    await db.execAsync(
        `CREATE TABLE IF NOT EXISTS sessions(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        workout_id INTEGER NOT NULL,
        time_started INTEGER,
        time_ended INTEGER,
        FOREIGN KEY (workout_id) REFERENCES workouts(id)
        );`
        
    )
    await db.execAsync(
        `CREATE TABLE IF NOT EXISTS session_exercises(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        session_id INTEGER NOT NULL,
        time_started INTEGER,
        time_ended INTEGER,
        exercise_name TEXT NOT NULL,
        FOREIGN KEY (session_id) REFERENCES sessions(id)
        );`
        
    )
    await db.execAsync(
        `CREATE TABLE IF NOT EXISTS session_sets(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        session_exercises_id INTEGER NOT NULL,
        set_number INTEGER,
        weight REAL,
        reps INTEGER
        exercise_name TEXT NOT NULL,
        FOREIGN KEY (session_exercises_id) REFERENCES session_exercises(id)
        );`
        
    )
    
    

}

