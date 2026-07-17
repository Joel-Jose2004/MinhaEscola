import { collection,onSnapshot } from "firebase/firestore";
import { COLLECTION_SCHOOL } from "../utils/constants";
import { db } from "../firebase/firebaseConfig";
import {type SchoolType } from "../Types/schoolInterface";
export default class MedioDAO{
    static shared= new MedioDAO()


    getSchool(callback:(data:SchoolType[])=>void){

        const q = collection(db, COLLECTION_SCHOOL);
    
    return onSnapshot(q, (querySnapshot) => {

        const lista:SchoolType[] = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }))as unknown as SchoolType[];
      callback(lista)
    })
    }
}