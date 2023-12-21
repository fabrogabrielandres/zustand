import { StateCreator } from "zustand";

export interface PersonSlice {
    FirstName:string,
    LastName:string,
    setFirstName:(value:string)=>void,
    setLastName:(value:string)=>void,
}


export const createPersonSlice:StateCreator<PersonSlice,[["zustand/devtools", never]]> = (set)=>({
    FirstName:"",
    LastName:"",

    setFirstName:(value)=>{set((_state:PersonSlice)=>({FirstName:value}),false,"setFirstName")},
    setLastName:(value)=> {        
        set((_state:PersonSlice)=>({
            LastName:value
        }),false,"setLastName")
    },
}) 
