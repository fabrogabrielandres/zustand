import { StateCreator } from "zustand";


export interface DateSlice {
  eventDate : Date;
  eventYYYYMMDD :()=>string;
  eventHHMM :()=>string;
  setEventDate     :(partialDate:string)=>void;
  setEventTime     :(partialDate:string)=>void;
}

export const createDateSlice : StateCreator<DateSlice> = ((set ,get)=>({

  eventDate : new Date(),
  eventYYYYMMDD : ()=>{
      const YYYYMMDD = get().eventDate.toISOString().split("T")[0]; 
      return YYYYMMDD
  },
  eventHHMM:()=>{
    const hours = get().eventDate.getHours().toString().padStart(2,"0");
    const minutes = get().eventDate.getMinutes().toString().padStart(2,"0");
      return `${hours}:${minutes}`
  },
  setEventDate: (partialDate:string)=>{
        console.log("slice",partialDate);
        
      set((state:DateSlice)=>
      {
            const date = new Date(partialDate)    
            const month = date.getMonth();
            const day = date.getDate();
            const year = date.getFullYear();
            
            const newDate = new Date(state.eventDate)
            newDate.setFullYear(year,month,day)
            console.log("slice2",{month,day,year,newDate});
            return {eventDate:newDate}
        }   
        )
    },
    setEventTime: (hourAndMinute:string)=>{
        set((state:DateSlice)=>{
            
            const newDate = state.eventDate;
            const hour  = hourAndMinute.split(":")[0];
            const minut = hourAndMinute.split(":")[1];
            console.log({hour,minut});
            newDate.setHours(Number(hour),Number(minut));         
            return ({eventDate:newDate})
        })               
    }
}))


