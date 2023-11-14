import { StateStorage, createJSONStorage } from "zustand/middleware";


const ApiStorage : StateStorage = {
    getItem: function (name: string): string | Promise<string | null> | null {
        const data = sessionStorage.getItem(name)
        // console.log("getItem",data);
        return data
    },
    setItem: function (name: string, value: string): void | Promise<void> {
        // console.log("setItem ", {name,value});
        sessionStorage.setItem(name,value)
    },
    removeItem: function (name: string): void | Promise<void> {
        console.log("removeItem ", name);
    }
}  

export const customSessionStorage = createJSONStorage(() => ApiStorage)