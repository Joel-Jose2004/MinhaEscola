import {create} from "zustand"
import DataDAO from "../databases/dataDAO"
import type { SchoolType } from "../Types/schoolInterface"
 import type { UniversityType } from "../Types/universityInterface"


interface actions{
   getSchool:(search:string)=>Promise<void>
   getUniversity:(search:string)=>Promise<void>
   getCourses:()=>Promise<void>
   listSchool:SchoolType[]
   listUni:UniversityType[]
   sugestCourse:string[]
  
}


 

export const useDataRepository=create<actions>((set)=>({
 listSchool:[],
 listUni:[],
 sugestCourse:[],

getSchool:async(search):Promise<void>=>{
    
     DataDAO.shared.getSchool((data)=>{
                  var dados:SchoolType[]=[]                
                  data.forEach(item => {
                  item.courses.filter(index=>index==search? dados.push(item):[])
                 })
        set({listSchool:dados})
     })
     
 
},

 
 getUniversity:async(search):Promise<void>=>{
    
   DataDAO.shared.getSuperior((data)=>{
      var dados:UniversityType[]=[]
                  data.forEach((item)=>{
                    item.courses.filter(index=>index==search ? dados.push(item):[])
                  }) 
          set({listUni:dados}) 
   
   })
    
 },

 getCourses:async():Promise<void>=>{
  var dados:string[]=[]
     DataDAO.shared.getSchool((data)=>{
        
          data.forEach((item)=>{
             item.courses.map(index=>index?dados.push(index):[])
          })
         set({sugestCourse:dados})
     })
     
     DataDAO.shared.getSuperior((data)=>{
       
          data.forEach((item)=>{
             item.courses.map(index=>index?dados.push(index):[])
          })
         set({sugestCourse:dados})
     })
 },
}))