

export interface SchoolInterface{
  imagem:string,
  name:string,
  id:string,
  link:string,
  location:string,
  userId:string,
  phone:String,
  email:string,
  saturday:{
    fim:string,
    inicio:string
  }
  mondayToFriday:{
    fim:string,
    inicio:string
  }
  courses:string[]
}


export type SchoolType=Omit<SchoolInterface,"id">