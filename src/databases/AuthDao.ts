
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword} from "firebase/auth"
import {getFunctions,httpsCallable} from "firebase/functions"
import type { userInterface } from "../Types/userType";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { COLLECTION_USERS } from "../utils/constants";
  const functions = getFunctions();
import {auth} from "../firebase/firebaseAuth"
   
export default class AuthDao{
   static shared=new AuthDao()


async createDonor(userData:userInterface,password:string){
      
        const auth = getAuth();
      try{ 
       const userCredential=await createUserWithEmailAndPassword(auth, userData.email, password)
          const user = userCredential.user;
        
          
             const updateUser={
                  ...userData,
                    id:user.uid,
                    role:"user",
                    data:serverTimestamp()
               }
                  
                await setDoc(doc(db,COLLECTION_USERS,user.uid),updateUser)
               return "concluido"
      
       
        }catch (error) {
          console.log("Erro ao criar usuário:", error);
          throw error
        }
   }


   async SignIn(email:string,password:string):Promise<string>{

  return new Promise((resolve, reject) => {


    signInWithEmailAndPassword(auth, email, password)
      .then((credential) => {


        resolve(credential.user.uid);

      })
      .catch((error) => {


        reject(error);

      });

  });       
   }


   
        
  async checkEmail(email: string):Promise<boolean>{
          const checkEmailFn = httpsCallable(functions, "checkEmailExists")
          const result = await checkEmailFn({ email });
         console.log(result.data)
          return (result.data as { exists: boolean }).exists;
        };
   
}