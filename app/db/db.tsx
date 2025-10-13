import * as SQLite from 'expo-sqlite';
import { migrations } from './migrations';

const db =  SQLite.openDatabaseSync('workouts.db');

export const runMigrations = async() =>{
    const [{user_version}] = db.getAllSync<{user_version:number}>("PRAGMA user_version;"); //Pragma is some sqlite command for changing features of database

    for (const migration of migrations) {
        if(migration.id > user_version){
            db.execSync(migration.up);
            db.execSync(`PRAGMA user_version=${migration.id}`);
            console.log('Migrated');
        }
    }

}


export const initDB = async() => {
    await runMigrations();

}

export default db