
export interface UniversityInterface{
  name:string,
  id:string,
  link:string,
  location:string,
  courses:[]
}


export type UniversityType=Omit<UniversityInterface,"id">