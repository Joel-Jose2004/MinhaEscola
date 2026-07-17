 import {create} from "zustand"
 import type { UniversityType } from "../Types/universityInterface"
import SuperiorDAO from "../databases/superiorDAO"
 
 interface actions{
    getSchool:(search:string)=>Promise<void>
    listUni:UniversityType[]    
    
 }
 
 
 export const useSuperiorRepository=create<actions>((set)=>({
   listUni:[],
 
 getSchool:async(search):Promise<void>=>{
   
   SuperiorDAO.shared.getSuperior((data)=>{
      var dados:UniversityType[]=[]
                  data.forEach((item)=>{
                    item.courses.filter(index=>index==search ? dados.push(item):[])
                  }) 
          set({listUni:dados}) 
   
   })
    
 },
 
 
 }))