import {create} from "zustand"
import MedioDAO from "../databases/medioDAO"
import type { SchoolType } from "../Types/schoolInterface"

interface actions{
   getSchool:(search:string)=>Promise<void>
   listSchool:SchoolType[]
}


 

export const useMedioRepository=create<actions>((set)=>({
 listSchool:[],

getSchool:async(search):Promise<void>=>{

     MedioDAO.shared.getSchool((data)=>{
                  var dados:SchoolType[]=[]                
                  data.forEach(item => {
                  item.courses.filter(index=>index==search? dados.push(item):[])
                 })
        set({listSchool:dados})
     })
     
 
},


}))