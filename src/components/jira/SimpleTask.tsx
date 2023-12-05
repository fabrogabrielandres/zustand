
import { IoReorderTwoOutline } from "react-icons/io5";
import { Task } from "../../Interfaces";
import { useTasksStore } from "../../store/task/task.store";

interface Props {
  task: Task;
}

export const SimpleTask = ({ task }: Props) => {
  const setDragingTaksId = useTasksStore((state) => state.setDragingTaksId)
  const removeDragingTaksId = useTasksStore((state) => state.removeDragingTaksId)
  

  return (
    <div draggable onDragStart={()=>setDragingTaksId(task.id)} onDragEnd={()=>removeDragingTaksId()} className="mt-5 flex items-center justify-between p-2"
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
