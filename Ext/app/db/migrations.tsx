export const migrations = [
    
    {id:1,
     up:`CREATE TABLE IF NOT EXISTS workouts(
             id INTEGER PRIMARY KEY AUTOINCREMENT,
             name TEXT NOT NULL UNIQUE
             );

         CREATE TABLE IF NOT EXISTS muscle_groups(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE
        );
        
        INSERT OR IGNORE INTO muscle_groups (name) VALUES
        ('None'),
        ('Chest'),
        ('Back'),
        ('Shoulders'),
        ('Arms'),
        ('Legs'),
        ('Abs');


        CREATE TABLE IF NOT EXISTS exercises_info(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        muscle_group INTEGER NOT NULL DEFAULT 1,
        FOREIGN KEY (muscle_group) REFERENCES muscle_groups(id)
        );

        CREATE TABLE IF NOT EXISTS exercises(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        workout_id INTEGER NOT NULL,
        exercise_id INTEGER NOT NULL,
        set_number INTEGER DEFAULT 1,
        FOREIGN KEY (exercise_id) REFERENCES exercises_info(id),
        FOREIGN KEY (workout_id) REFERENCES workouts(id)
        );

        CREATE TABLE IF NOT EXISTS sessions(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        workout_id INTEGER NOT NULL,
        time_started INTEGER NOT NULL,
        time_ended INTEGER,
        FOREIGN KEY (workout_id) REFERENCES workouts(id)
        );

        CREATE TABLE IF NOT EXISTS session_exercises(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        session_id INTEGER NOT NULL,
        exercise_id INTEGER NOT NULL,
        FOREIGN KEY (exercise_id) REFERENCES exercises_info(id),
        FOREIGN KEY (session_id) REFERENCES sessions(id)
        );

        CREATE TABLE IF NOT EXISTS session_sets(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        session_exercises_id INTEGER NOT NULL,
        set_number INTEGER,
        weight REAL,
        reps INTEGER,
        FOREIGN KEY (session_exercises_id) REFERENCES session_exercises(id)
        );`,
    },
    {id:2,
     up:`
        DROP TABLE IF EXISTS session_exercises;

        DROP TABLE IF EXISTS session_sets;
        CREATE TABLE IF NOT EXISTS session_sets(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        session_id INTEGER NOT NULL,
        exercise_id INTEGER NOT NULL,
        set_number INTEGER,
        weight REAL,
        reps INTEGER,
        notes VARCHAR(250),
        FOREIGN KEY (session_id) REFERENCES sessions(id),
        FOREIGN KEY (exercise_id) REFERENCES exercises_info(id)
        );

        ALTER TABLE sessions add COLUMN session_name TEXT;




     `

    },
    {id:3,
     up:`
        DROP TABLE IF EXISTS session_sets;
        CREATE TABLE IF NOT EXISTS session_sets(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        session_id INTEGER NOT NULL,
        exercise_id INTEGER NOT NULL,
        set_number INTEGER,
        weight REAL,
        reps INTEGER,
        notes VARCHAR(250),
        FOREIGN KEY (session_id) REFERENCES sessions(id),
        FOREIGN KEY (exercise_id) REFERENCES exercises_info(id)
        );
        DROP TABLE IF EXISTS workouts;
        CREATE TABLE IF NOT EXISTS workouts(
             id INTEGER PRIMARY KEY AUTOINCREMENT,
             name VARCHAR(30) NOT NULL UNIQUE
        );
        DROP TABLE IF EXISTS sessions;
        CREATE TABLE IF NOT EXISTS sessions(
             id INTEGER PRIMARY KEY AUTOINCREMENT,
             workout_id INTEGER NOT NULL,
             session_name VARCHAR(30),
             time_started INTEGER NOT NULL,
             time_ended INTEGER,
             FOREIGN KEY (workout_id) REFERENCES workouts(id)
        );
        
        DELETE FROM exercises;
        DELETE FROM exercises_info;
        INSERT INTO exercises_info (name, muscle_group) VALUES
        ('Bench Press', 2),
        ('Upper Chest Fly', 2),
        ('Upper Back Row', 3),
        ('Lat Pulldown', 3),
        ('Kelso Shrug', 3),
        ('Lateral Raises', 4),
        ('Shoulder Press', 4),
        ('Rear Delt Fly', 4),
        ('Tricep Extension', 5),
        ('Preacher Curl', 5),
        ('Barbell Squat', 6),
        ('SLDL', 6),
        ('Ab Crunch', 7);`

    },
    {id:4,
     up:`
        DROP TABLE IF EXISTS exercises;
        CREATE TABLE IF NOT EXISTS exercises(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        workout_id INTEGER NOT NULL,
        exercise_id INTEGER NOT NULL,
        set_number INTEGER DEFAULT 1,
        notes VARCHAR(250),
        FOREIGN KEY (exercise_id) REFERENCES exercises_info(id),
        FOREIGN KEY (workout_id) REFERENCES workouts(id)
        );
     `
    
    },
    {id:5,
     up:`
        DROP TABLE IF EXISTS exercises;
        CREATE TABLE IF NOT EXISTS exercises(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        workout_id INTEGER NOT NULL,
        exercise_id INTEGER NOT NULL,
        set_number INTEGER DEFAULT 1,
        FOREIGN KEY (exercise_id) REFERENCES exercises_info(id),
        FOREIGN KEY (workout_id) REFERENCES workouts(id)
        );
        CREATE TABLE IF NOT EXISTS notes(
        exercise_id INTEGER NOT NULL,
        content VARCHAR(250),
        PRIMARY KEY (exercise_id),
        FOREIGN KEY (exercise_id) REFERENCES exercises(id)
        );
     `
    
    },
    {id:6,
     up:`
        DROP TABLE IF EXISTS notes;
        CREATE TABLE IF NOT EXISTS notes(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        exercise_id INTEGER NOT NULL,
        content VARCHAR(250),
        FOREIGN KEY (exercise_id) REFERENCES exercises(id)
        );
     `
    
    },
    {id:7,
      up:`
         DROP TABLE IF EXISTS notes;
         CREATE TABLE IF NOT EXISTS notes(
         id INTEGER PRIMARY KEY AUTOINCREMENT,
         ex_id INTEGER NOT NULL,
         content VARCHAR(250),
         FOREIGN KEY (ex_id) REFERENCES exercises_info(id)
         );
      `
    },
]