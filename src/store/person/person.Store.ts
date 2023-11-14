import { create, type StateCreator } from "zustand";
import {  persist } from "zustand/middleware";
import { customSessionStorage } from "../storages/session-Storage.storage";

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



export const usePersonStore = create<PersonStore & Actions>()(
  persist(
    StoreApi, {
    name: "usePersonStore",
    storage: customSessionStorage
  })
);


