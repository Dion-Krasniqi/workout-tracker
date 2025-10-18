# Overview 

Ext is a workout tracking app built with React Native + Expo. It uses Zustand for state management and Sqlite for persistent data storage.
The app allows the user to create their own exercises and workouts,track workouts as sessions by logging weights and reps used for each set of each exercise of a workout, check data of a given exercise, and more.

## Using the app
* To use the application out of the box head over at the playstore link where you can find a downloadable version.
* If you want to build the app yourself, you need to have node and npm installed. Start by cloning the repo locally or downloading the files. 


## Exercises
The apps comes with a few built in exercises and workouts. To view all exercises navigate to the exercise list by pressing the Exercise List button found in the workouts tab, there you can also find the Create Exercise button which allows you to create a custom exercise using a unique name and optional muscle group.

## Workouts
To view workouts or create a custom one, simply open the workouts tab where you can find a button and list. Clicking on a workout shows the workouts exercises and number of sets of a given exercise, while holding an entry starts a session(or prompts with a warning if there is an active session).

## Sessions
Sessions are "active" instances of workout routines. To start a session click on a workout to see the routine where you'll also find a start workout button, or simply hold the workout listing in the workouts tab. A session ends after clicking the finish button in an active session,after which it will save the session and write the set data. If stopped forcefully(by starting a new session while another is active), no data is saved.


## Known issues and future features:
* Loading of objects from Zustand needs work, both the functions and their implementation;
* Most of UI needs to be improved and standardised;
* When dropdown menu in exercise creation is active, there appears a black box at the bottom;
* (Related ish) Better showcasing of exercise data;
* Loading screen before actual loading the sessions/workouts;
* Stopwatch resets if active session is exited;

Planned features:
* Search/filter sessions, workouts, and exercises;
* Delete exercises
* Change workout name;
* Edit exercise set number;
* Edit session start and end time;
* Remove set/exercise in active workout;
* Prior session data be viewable;
* Data should be trasnfarable, either account or extracting and importing manually;


