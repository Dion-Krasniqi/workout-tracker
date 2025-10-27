import * as FS from 'expo-file-system/legacy';
import * as Sharing from 'expo-sharing';
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


export const exportAllSetData = async() => {
    try {
        const rows = await db.getAllAsync<{id:string;session_id:string,number:number;weight:number;reps:number;date:Date;name:string}>
        (`SELECT s.id, s.session_id,s.set_number, s.weight, s.reps, s.date, ex.name
                                           FROM session_sets AS s
                                           JOIN exercises_info AS ex ON s.exercise_id = ex.id`);
        if (!rows || rows.length === 0) return alert("No set data found!");
        const header = Object.keys(rows[0]).join(",") + "\n";
        const body = rows.map(r => Object.values(r).map(val => {/* figure this out if(val instanceof Date){val = date object};console.log(`"${String(val).replace(/"/g, '""')}"`);*/return`"${String(val).replace(/"/g, '""')}"`}).join(",")).join("\n");
        const csv = header + body;
        const filename = `session_sets${Date.now()}.csv`;
        const fileUri = FS.cacheDirectory+ filename;

        await FS.writeAsStringAsync(fileUri, csv, {encoding: FS.EncodingType.UTF8,});

        if (await Sharing.isAvailableAsync()){
            await Sharing.shareAsync(fileUri,{
                    mimeType: "text/csv",
                    dialogTitle: "Export Session Sets",
        });
        } else {
            return alert("Sharing is not available")
        }
        
    } catch (error){
        console.log(error);
        return alert("Export error");
    }
}