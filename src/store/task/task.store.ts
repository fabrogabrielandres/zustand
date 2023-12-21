import { create, type StateCreator } from "zustand";
import { TaksStatus, Task } from "../../Interfaces";
import { devtools, persist } from "zustand/middleware";
import  {  v4  as  uuidv4  }  from  'uuid' ; 
import { produce } from "immer";
import { immer } from "zustand/middleware/immer";
import { customSessionStorage } from "../storages/session-Storage.storage";

interface TaskStore {
  dragingTaksId?: string;
  tasks: Record<string, Task>; // {[key:string]: Taks}
  getTaskByStatus: (status: TaksStatus) => Array<Task>;
  setDragingTaksId: (taskId: string) => void;
  removeDragingTaksId: () => void;
  changeTaksStatus:(taskId: string,status: TaksStatus)=>void;
  onTaskDrop:(status: TaksStatus)=>void;
  addTask:(title:string, status: TaksStatus)=>void;
}

const StoreApi: StateCreator<TaskStore,[["zustand/devtools", never],["zustand/immer", never]]> = (set, get) => ({
  dragingTaksId: undefined,
  tasks: {
    "Id-1": { id: "Id-1", status: "open", tittle: "taks-1" },
    "Id-2": { id: "Id-2", status: "in-progress", tittle: "taks-2" },
    "Id-3": { id: "Id-3", status: "done", tittle: "taks-3" },
    "Id-4": { id: "Id-4", status: "open", tittle: "taks-4" },
  },
  getTaskByStatus(status) {
    let listTask = Object.values(get().tasks);
    return listTask.filter((taks) => taks.status === status);
  },
  addTask:(tittle,status)=>{
    const newTask: Task = {
        id:uuidv4(),
        status,
        tittle
    }; 
    // set((state)=>({tasks:{...state.tasks,[newTask.id]:newTask}}),false,"addTask") /* with spread operator  */ 
    // set(produce((state:TaskStore)=>{state.tasks[newTask.id]=newTask}),false,"addTask") /* with immer  */ 
    set(state=>{state.tasks[newTask.id]=newTask},false,"addTask") /* with immer  */ 
  },
  setDragingTaksId: (taskId: string) =>set((_state: TaskStore) => ({ dragingTaksId: taskId}),false,"setDragingTaksId"),
  removeDragingTaksId: () =>set((_state: TaskStore) => ({dragingTaksId: ""}),false,"removeDragingTaksId"),
  changeTaksStatus:(taskId: string,status: TaksStatus)=>{
      const task ={...get().tasks[taskId]}; 
      task.status=status;
      // set((state)=>({tasks:{...state.tasks,[taskId]:task}}),false,"changeTaksStatus") /* with spread operator  */ 
      // set(produce((state:TaskStore)=>{ state.tasks[taskId]=task})  /* with immmer */)
      set((state:TaskStore)=>{ state.tasks[taskId]=task},false,"changeTaksStatus"  /* with middleware immmer */)
    },
  onTaskDrop:(status: TaksStatus)=>{
    const taskId = get().dragingTaksId;
    if(!taskId) return
    get().changeTaksStatus(taskId,status);
    get().removeDragingTaksId();
  }    
})
export const useTasksStore = create<TaskStore>()(devtools(
    persist(
      immer(StoreApi),
        {
          name: "task-storage",
          storage: customSessionStorage
          // storage: fireBaseStorage
        }
    )
  ));
