

export interface SchoolInterface{
  name:string,
  id:string,
  location:string,
  courses:[]
}


export type SchoolType=Omit<SchoolInterface,"id">