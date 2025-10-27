# Overview 

Ext is a workout tracking app built with React Native + Expo. It uses Zustand for state management and Sqlite for persistent data storage.
The app allows the user to create their own exercises and workouts,track workouts as sessions by logging weights and reps used for each set of each exercise of a workout, check data of a given exercise, and more.

![Alt text](https://play-lh.googleusercontent.com/0BThFxVVxDDVrl2lLeBQCREJc9aWDo9HBzY_agDBldQVuPes5UOf9ZNpKNP1n0DhaSAizigdF-wUOFt51n3_=w1052-h592-rw "main")

## Using the app
* To use the application out of the box with ads inlcuded(not currently), head over at the playstore link where you can find a downloadable version.
* The apk build is listed in the assets section of each release
* If you want to build the app yourself, donwload the source code listed in the assets or directly from the repo. You must have node and npm installed. After you've downloaded the files, run npm install(or equivalent line) to install the requirements. Lastly, if you decide to use expo run:
"eas build -p android --profile apkrelease" for the apk build or
"eas build -platform android" for the aab build.
I have no idea how to make it work with IOS.

## Exercises
The app comes with a few built in exercises and workouts. To view all exercises navigate to the exercise list by pressing the Exercise List button found in the workouts tab, there you can also find the Create Exercise button which allows you to create a custom exercise using a unique name and optional muscle group.

## Workouts
To view workouts or create a custom one, simply open the workouts tab where you can find a button and list. Clicking on a workout shows the workouts exercises, number of sets of a given exercise and button to start workout, while holding an entry starts a session(or prompts with a warning if there is an active session).

## Sessions
Sessions are "active" instances of workout routines. To start a session click on a workout to see the routine where you'll also find a start workout button, or simply hold the workout listing in the workouts tab. A session ends after clicking the finish button in an active session,after which it will save the session and write the set data. If stopped forcefully(by starting a new session while another is active), no data is saved.


## Known issues and future features:
* Loading of objects from Zustand needs work, both the functions and their implementation;
* Most of UI needs to be improved and standardised;
* When dropdown menu in exercise creation is active, there appears a black box at the bottom;
* (Related ish) Better showcasing of exercise data;
* Loading screen before actual loading the sessions/workouts;
* Stopwatch resets if active session is exited;
* Mix of tailwindCSS and CSS might mess up some styling;


Planned features:
* Search/filter sessions, workouts, and exercises;
* Delete exercises;
* Change workout name;
* Edit exercise set number;
* Edit session start and end time;
* Remove set/exercise in active workout;
* Prior session data be viewable;
* Data should be trasnfarable, either account or extracting and importing manually;
* Session based memory option;
* Reset exercise data and add optional marker;
* Exercise reordering;