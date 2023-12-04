export interface Task{
    id:string,
    tittle: string,
    status: TaksStatus        
}

export type TaksStatus = "in-progress" | "done" | "open";


