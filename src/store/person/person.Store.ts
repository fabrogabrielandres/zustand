import { create, type StateCreator } from "zustand";
import {  persist , devtools } from "zustand/middleware";
import { customSessionStorage } from "../storages/session-Storage.storage";
import { fireBaseStorage } from "../storages/firebase.storage";

interface PersonStore {
  firstName: string;
  lastName: string;
}

interface Actions {
  setFirstName: (by: string) => void;
  setLastName: (by: string) => void;
}

const StoreApi: StateCreator<PersonStore & Actions, [["zustand/devtools", never]]> = (set) => ({
  firstName: "",
  lastName: "",
  setFirstName: (by: string) => set((_state) => ({ firstName: by }),false , "setFirstName"),
  setLastName: (by: string) => set( (_state) => ({ lastName : by }),false , "setLastName"),
});



export const usePersonStore = create<PersonStore & Actions>()(
  devtools(
    persist(
      StoreApi, {
        name: "firebaseStore",
        // storage: customSessionStorage
        storage: fireBaseStorage
      })
  )
);


