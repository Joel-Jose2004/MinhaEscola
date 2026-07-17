import { collection ,onSnapshot,} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { COLLECTION_UNIVERSITY } from "../utils/constants";
import { type UniversityType } from "../Types/universityInterface";

export default class SuperiorDAO{
    static shared=new SuperiorDAO()


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