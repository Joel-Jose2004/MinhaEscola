import { getDocs,collection,where,query, getDoc, doc } from "firebase/firestore"
import { db } from "../firebase/firebaseConfig"
import { COLLECTION_USERS } from "../utils/constants"
import type { userInterface } from "../Types/userType"


export class UserDao{
   static shared=new UserDao()

   


  async getUserByEmail(email:string):Promise<userInterface|undefined>{
  try{
       const q = query( collection(db, COLLECTION_USERS),where("email", "==", email));
       
         const querySnapshot = await getDocs(q);
       
         if (!querySnapshot.empty) {
           const doc = querySnapshot.docs[0];
         
           const dados= doc.data() as userInterface
           console.log(dados?.role)
               
            localStorage.setItem("MinhaEscola",JSON.stringify(dados?.role))
            
           return dados as userInterface
         }


  }catch(err){
     throw err
  }
    
  }
 
 
  async getUserById(id:string):Promise<userInterface>{
    const querySnapshot= await getDoc(doc(db,COLLECTION_USERS,id))
   const dados=querySnapshot.data()as unknown as userInterface
     return dados
 }

 

}

