import { StateCreator, create } from 'zustand'

export interface ConfirmInterface {
  confirm : boolean;
  setConfirm : (val : boolean) => void;
}
export const createConfirmSlice :  StateCreator<ConfirmInterface> = ((set)=>({
    confirm : false,
    setConfirm : (val:boolean) => set((_state) => ({ confirm : val }))
}))
