import {DragEvent} from "react"
import { IoReorderTwoOutline } from "react-icons/io5";
import { Task } from "../../Interfaces";
import { useTasksStore } from "../../store/task/task.store";

interface Props {
  task: Task;
}

export const SimpleTask = ({ task }: Props) => {
  const setDragingTaksId = useTasksStore((state) => state.setDragingTaksId)
  const removeDragingTaksId = useTasksStore((state) => state.removeDragingTaksId)
  
  const onDrag=(e:DragEvent<HTMLDivElement>)=>{console.log(e)}
  const onDragLeave=(e:DragEvent<HTMLDivElement>)=>{console.log(e)}
  const onDrop=(e:DragEvent<HTMLDivElement>)=>{console.log(e)}
  return (
    <div draggable onDragStart={()=>setDragingTaksId(task.id)} onDragEnd={()=>removeDragingTaksId()} className="mt-5 flex items-center justify-between p-2"
        onDrag={onDrag}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
    >
      <div className="flex items-center justify-center gap-2">
        <p className="text-base font-bold text-navy-700">{task.tittle}</p>
      </div>
      <span className=" h-6 w-6 text-navy-700 cursor-pointer">
        <IoReorderTwoOutline />
      </span>
    </div>
  );
};
