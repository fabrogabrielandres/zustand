import { StateCreator } from "zustand";


export interface DateSlice {
  eventDate : Date;
  eventYYYYMMDD :()=>string;
  eventHHMM     :()=>string;
  setEventDate     :(partialDate:string)=>void;
}

export const createDateSlice : StateCreator<DateSlice> = ((set ,get)=>({

  eventDate : new Date(),
  eventYYYYMMDD : ()=>{
      const eventHHMM = get().eventDate.toISOString().split("T")[0]; 
      return eventHHMM
  },
  eventHHMM:()=>{
    const hours = get().eventDate.getHours().toString().padStart(2,"0");
    const minutes = get().eventDate.getMinutes().toString().padStart(2,"0");
      return `${hours}:${minutes}`
  },
  setEventDate: (partialDate:string)=>{
      set((state:DateSlice)=>
      {
            const date = new Date(partialDate)    
            const month = date.getMonth();
            const day = date.getDay();
            const year = date.getFullYear();
            const newDate = new Date(state.eventDate)
            newDate.setFullYear(year,month,day)
            return {eventDate:newDate}
        }   
        )
    },
    setHHMM: (hours:string)=>{set((state:DateSlice)=>({}))},
}))


