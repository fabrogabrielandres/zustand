import {DragEvent, useEffect, useState} from "react"
import {
  IoCheckmarkCircleOutline,
  IoEllipsisHorizontalOutline,
} from "react-icons/io5";
import { TaksStatus, Task } from "../../Interfaces";
import { SimpleTask } from "./SimpleTask";
import classNames from "classnames";
import { useTasksStore } from "../../store/task/task.store";

interface Props {
  title: string;
  value: TaksStatus;
  tasks: Task[];
}

export const JiraTasks = ({ title, tasks, value }: Props) => {
  const dragingTaksId = useTasksStore((state) => state.dragingTaksId);
  const changeTaksStatus = useTasksStore((state) => state.changeTaksStatus);
  const [onDragOver, setOnDragOver] = useState(false);

  const handleonDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault(),
    setOnDragOver(true)
  };
  const handleOnDragLeave = (e: DragEvent<HTMLDivElement>) => {
    // e.preventDefault()
    setOnDragOver(false)
  };
  const handleOnDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setOnDragOver(false)
    changeTaksStatus(dragingTaksId!,value)
  };

  

  return (
    <div
      onDragOver={handleonDragOver}
      onDragLeave={handleOnDragLeave}
      onDrop={handleOnDrop}
      className={classNames(
        "!text-black relative flex flex-col rounded-[20px]  bg-white bg-clip-border shadow-3xl shadow-shadow-500  w-full !p-4 3xl:p-![18px]",
        {
          "border-dotted border-2 border-indigo-600": dragingTaksId,
          "border-dotted border-2 border-green-600": dragingTaksId && onDragOver,
        }
      )}
    >
      {/* Task Header */}
      <div className="relative flex flex-row justify-between">
        <div className="flex items-center justify-center">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100">
            <span className="flex justify-center items-center h-6 w-6 text-brand-500">
              <IoCheckmarkCircleOutline style={{ fontSize: "50px" }} />
            </span>
          </div>

          <h4 className="ml-4 text-xl font-bold text-navy-700">{title}</h4>
        </div>

        <button>
          <IoEllipsisHorizontalOutline />
        </button>
      </div>

      {/* Task Items */}
      <div className="h-full w-full">
        {tasks.map((task) => (
          <SimpleTask key={task.id} task={task}></SimpleTask>
        ))}
      </div>
    </div>
  );
};
