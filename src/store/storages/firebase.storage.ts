import { StateStorage, createJSONStorage } from "zustand/middleware";

const urlFirebase = "https://zustand-tutorial-default-rtdb.europe-west1.firebasedatabase.app/"

const ApiStorage : StateStorage = {
    getItem: async function (name: string): Promise<string | null> {
        
        try {
            const dataFirebase = await fetch(`${urlFirebase}${name}.json`).then((res)=>res.json())
            return JSON.stringify(dataFirebase)
        } catch (error) {
            throw error            
        }
    },
    setItem: function (name: string, value: string): void | Promise<void> {
        fetch(`${urlFirebase}${name}.json`,{
            method:"PUT",
            body:value
        }).then((res)=>{
            console.log(res.json);
            res.json
        })
    },
    removeItem: function (name: string): void | Promise<void> {
        console.log("removeItem ", name);
    }
}  

export const fireBaseStorage = createJSONStorage(() => ApiStorage)