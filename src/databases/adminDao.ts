import { getDocs,collection,where,query,onSnapshot,addDoc } from "firebase/firestore"
import { db } from "../firebase/firebaseConfig"
import { COLLECTION_USERS,COLLECTION_UNIVERSITIES,COLLECTION_SCHOOL} from "../utils/constants"
import { getAuth , signInWithEmailAndPassword} from "firebase/auth"
import { type adminInterface } from "../Types/adminTypes"
import { type SchoolInterface } from "../Types/schoolInterface"
import {type UniversityInterface } from "../Types/universityInterface"
import {type hourInterface, type instituteInterface } from "../Types/instituteType"

export class AdminDao{
   static shared=new AdminDao()


  login(email:string,password:string){
    
      return new Promise((resolve,reject)=>{
            const auth = getAuth();
          if(auth){
           
         const credential=signInWithEmailAndPassword(auth,email,password)
        
         console.log(credential.then((res)=>{res.user.providerData}))
          resolve("feito")
          }else{
           return reject("Usuario não encontrado")
          }

      })
      
  }



 async addSchool(
     imagem:string,
    informations:instituteInterface,
    mondayToFriday:hourInterface,
     saturday:hourInterface,
     schoolName:string,
     schoolWebsite:string,
     courses:string[],userId:string){
   
   const dados={
       imagem:imagem,
       mondayToFriday:mondayToFriday,
       saturday:saturday,
       email:informations.email,
       phone:informations.phone,
       location:informations.location,
       name:schoolName,
       link:schoolWebsite,
       courses:courses,
       userId:userId
   }
   
   try{
     
   const docRef = await addDoc(collection(db, COLLECTION_SCHOOL),dados);
   console.log(docRef)
   }catch(err){
    console.log(err)
   }



 }

 async addUniversity(
    imagem:string,
     informations:instituteInterface,
     mondayToFriday:hourInterface,
     saturday:hourInterface,
     universityName:string,
     universityWebsite:string,
     courses:string[],userId:string){
const dados={
       imagem:imagem,
       mondayToFriday:mondayToFriday,
       saturday:saturday,
       email:informations.email,
       phone:informations.phone,
       location:informations.location,
       name:universityName,
       link:universityWebsite,
       courses:courses,
       userId:userId
   }
   
   try{
     
   const docRef = await addDoc(collection(db, COLLECTION_UNIVERSITIES),dados);
   console.log(docRef)
   }catch(err){
    console.log(err)
   }


 
 }



 getUserByEmail(email:string){

 return new Promise(async(resolve,reject)=>{
           const q = query( collection(db, COLLECTION_USERS),where("email", "==", email));
       
         const querySnapshot = await getDocs(q);
       
         if (!querySnapshot.empty) {
           const doc = querySnapshot.docs[0];
         
           const dados= doc.data()
               
            localStorage.setItem("MinhaCasa",JSON.stringify(dados.id))
            
           resolve(dados)
       
         }else{
           reject("Não encontrado")
         } 
   
         })
 } 

 async getUserById(callback:(dados:adminInterface[])=>void){
      const q = collection(db, COLLECTION_USERS);
        
        await onSnapshot(q, (querySnapshot) => {
    
            const pedidos:adminInterface[] = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }))as adminInterface[];
          
         callback(pedidos)
        })
 }

 async getUniversities(callback:(dados:UniversityInterface[])=>void){
     const q = collection(db, COLLECTION_UNIVERSITIES);
        
        await onSnapshot(q, (querySnapshot) => {
    
            const pedidos:UniversityInterface[] = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }))as unknown as UniversityInterface[];
          
         callback(pedidos)
        })
 }


 async getSchools(callback:(dado:SchoolInterface[])=>void){
    const q = collection(db, COLLECTION_SCHOOL);
        
        await onSnapshot(q, (querySnapshot) => {
    
            const pedidos:SchoolInterface[] = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }))as unknown as SchoolInterface[];
          
         callback(pedidos)
        })
 }


}

