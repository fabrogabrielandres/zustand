import { create } from 'zustand'

interface Bear {
  id:number,
  name:string
}

interface BearState {
    blackBears:number,
    pandaBears:number,
    polarBears:number,
    bears: Bear[],
    computed:{
      totalBears: number
    }
    
    increaseBlackBears:(by:number)=>void,
    increasePandaBears:(by:number)=>void,
    increasePolarBears:(by:number)=>void,
    
    doNothing:()=>void,
    clearBers:()=>void,
    addBers:()=>void,
}

export const useBearStore = create<BearState>()((set,get) => ({
  blackBears:50,
  pandaBears:15,
  polarBears:5,
  bears:[{id:1,name:"Oso #1"}],

  computed:{
    get totalBears(){
      return get().blackBears + get().polarBears + get().pandaBears + get().bears.length
    }
  },

  doNothing:()=>set((state)=>({bears: [...state.bears]})),
  clearBers:()=>set(({bears: []})),
  addBers  :()=>set((state)=>({bears: [
    ...state.bears,{name:`Oso #${state.bears.length+1}`, id:state.bears.length+1}    
  ]})),
  
  increaseBlackBears:  (by) => set((state) => ({ blackBears: state.blackBears + by })),
  increasePandaBears: (by) => set((state) => ({ pandaBears: state.pandaBears + by })),
  increasePolarBears: (by) => set((state) => ({ polarBears: state.polarBears + by }))
}))