import { StateCreator } from "zustand";



export interface GuestSLice {
  guestsCount : number;
  setGuests : (val : number) => void;
}
export const createWeddingSLice : StateCreator<GuestSLice> = ((set)=>({
guestsCount : 0,
  setGuests : (val) => set( (_state:GuestSLice) => ({ guestsCount : val }))
}))



