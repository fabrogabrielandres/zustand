import { create, type StateCreator } from "zustand";
import { TaksStatus, Task } from "../../Interfaces";
import { devtools } from "zustand/middleware";

interface TaskStore {
  dragingTaksId?: string;
  tasks: Record<string, Task>; // {[key:string]: Taks}
  getTaskByStatus: (status: TaksStatus) => Array<Task>;
  setDragingTaksId: (taskId: string) => void;
  removeDragingTaksId: () => void;
}

const StoreApi: StateCreator<TaskStore,[["zustand/devtools", never]]> = (set, get) => ({
  dragingTaksId: undefined,
  tasks: {
    "taks-1": { id: "Id-1", status: "open", tittle: "taks-1" },
    "taks-2": { id: "Id-2", status: "in-progress", tittle: "taks-2" },
    "taks-3": { id: "Id-3", status: "done", tittle: "taks-3" },
    "taks-4": { id: "Id-4", status: "open", tittle: "taks-4" },
  },
  getTaskByStatus(status) {
    let listTask = Object.values(get().tasks);
    return listTask.filter((taks) => taks.status === status);
  },
  setDragingTaksId: (taskId: string) =>set((_state: TaskStore) => ({ dragingTaksId: taskId}),false,"setDragingTaksId"),
  removeDragingTaksId: () =>set((_state: TaskStore) => ({dragingTaksId: ""}),false,"removeDragingTaksId")
});
export const useTasksStore = create<TaskStore>()(devtools(StoreApi));
