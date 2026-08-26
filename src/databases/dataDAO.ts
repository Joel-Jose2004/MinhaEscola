import { collection,onSnapshot } from "firebase/firestore";
import { COLLECTION_SCHOOL, COLLECTION_UNIVERSITY } from "../utils/constants";
import { db } from "../firebase/firebaseConfig";
import {type SchoolType } from "../Types/schoolInterface";
import type { UniversityType } from "../Types/universityInterface";

export default class DataDAO{
    static shared= new DataDAO()


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

    getSuperior(callback:(data:UniversityType[])=>void){
            const q = collection(db, COLLECTION_UNIVERSITY);
        
         onSnapshot(q, (querySnapshot) => {
    
            const lista: UniversityType[] = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            })) as unknown as UniversityType[];
    
          callback(lista) 
        })
    
    }
    
}