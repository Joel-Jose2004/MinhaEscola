import type { Timestamp } from "firebase/firestore"

export interface userInterface{
    name:string,
    id:string,
    email:string,
    role:"user"|"schoolUser"
    date_born:"",
    phone:"",
    data:Timestamp
}

