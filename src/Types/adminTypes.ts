

export interface adminInterface{
    name:string,
    id:string,
    email:string
}

export type adminType=Omit<adminInterface,"id">