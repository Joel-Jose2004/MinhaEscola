import { AdminDao } from "../databases/adminDao"
import {create} from "zustand"
import type { adminInterface} from "../Types/adminTypes"
import type { UniversityInterface } from "../Types/universityInterface"
import type { SchoolInterface } from "../Types/schoolInterface"
import {type instituteInterface } from "../Types/instituteType"
import {type hourInterface } from "../Types/instituteType"

interface actions{

    addSchool: (
        url:string,
        informations:instituteInterface,
        mondayToFriday:hourInterface,
        saturday:hourInterface,
        schoolName:string,
        schoolWebsite:string,
        category:string,
        courses:string[],
        userId:string)=>Promise<void>
    login:(email:string,password:string)=>void
    getUserById:(id:string)=>void
    getUniversities:(userId:string)=>void
    getSchools:(userId:string)=>void
    UserList:adminInterface[],
    listUni:UniversityInterface[]
    listSchool:SchoolInterface[]
}


export const  UseAdminRepository=create<actions>((set)=>({
  UserList:[],
  listUni:[],
  listSchool:[],
  
addSchool: async (
    url:string,
    informations:instituteInterface,
    mondayToFriday:hourInterface,
    saturday:hourInterface,
    schoolName:string,
    schoolWebsite:string,
    category:string,
    courses:string[],
    userId:string)=>{
    if(category=="medio"){
           AdminDao.shared.addSchool(url,informations,mondayToFriday,saturday,schoolName,schoolWebsite,courses,userId)
    }else{
          AdminDao.shared.addUniversity(url,informations,mondayToFriday,saturday,schoolName,schoolWebsite,courses,userId)
    }

},
login(email, password) {
    AdminDao.shared.login(email,password).then(()=>{
        AdminDao.shared.getUserByEmail(email).then(()=>{
            location.href="/HomePage"
        })
    }).catch((error)=>{
        console.log(error)
    })
},

getUserById(id) {
 AdminDao.shared.getUserById((dados)=>{
      const filtrar=dados.filter(index=>index.id==id)
      set({UserList:filtrar})
 })
 
},
getUniversities(userId) {
      AdminDao.shared.getUniversities((dados)=>{
        const filtrar=dados.filter(index=>index.userId==userId)
       
        set({listUni:filtrar as unknown as UniversityInterface[]})
      })
},
getSchools(userId) {
      AdminDao.shared.getSchools((dados)=>{
        const filtrar=dados.filter(index=>index.id==userId)
        set({listSchool:filtrar})
      })
},
}))         

