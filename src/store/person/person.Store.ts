import { create, type StateCreator } from "zustand";
import { createJSONStorage, persist, StateStorage } from "zustand/middleware";

interface PersonStore {
  firstName: string;
  lastName: string;
}

interface Actions {
  setFirstName: (by: string) => void;
  setLastName: (by: string) => void;
}

const StoreApi: StateCreator<PersonStore & Actions> = (set) => ({
  firstName: "",
  lastName: "",
  setFirstName: (by: string) => set((_state) => ({ firstName: by })),
  setLastName: (by: string) => set((_state) => ({ lastName: by })),
});

const sessionStorage : StateStorage = {
    getItem: function (name: string): string | Promise<string | null> | null {
        console.log("getItem ", name);
        
        return null
    },
    setItem: function (name: string, value: string): void | Promise<void> {
        console.log("setItem ", {name,value});
    },
    removeItem: function (name: string): void | Promise<void> {
        console.log("removeItem ", name);
    }
}  

export const usePersonStore = create<PersonStore & Actions>()(
  persist(
    StoreApi, {
    name: "usePersonStore",
    storage:createJSONStorage(() => sessionStorage)
  })
);


