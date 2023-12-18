import {DragEvent, useState} from "react"
import Swal from "sweetalert2";
import { useTasksStore } from "../store/task/task.store";
import { TaksStatus } from "../Interfaces";


interface Properties {
    status: TaksStatus;
}


export const useTasks = ({status}:Properties) => {
    const addTask = useTasksStore((state) => state.addTask);
    const onTaskDrop = useTasksStore((state) => state.onTaskDrop);
    const [onDragOver, setOnDragOver] = useState(false);
    const dragingTaksId = useTasksStore((state) => state.dragingTaksId);
  
    const handleonDragOver = (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault(),
      setOnDragOver(true)
    };
    const handleOnDragLeave = (_e: DragEvent<HTMLDivElement>) => {
      // e.preventDefault()
      setOnDragOver(false)
    };
    const handleOnDrop = (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      setOnDragOver(false)
      onTaskDrop(status)
    };
  
    const handleaddTask = async()=>{
      const resp = await Swal.fire({
        title: "Ingrese el nombre del nuevo titulo",
        input: "text",
        inputAttributes: {
          autocapitalize: "off"
        },
        showCancelButton: true,
        confirmButtonText: "Look up",
        showLoaderOnConfirm: true,
        // allowOutsideClick: () => !Swal.isLoading(),
        inputValidator:(status)=>{
          if(!status){
            return "Debe ingresar un titulo"
          }
        }
      })
      console.log(resp);
      if(resp.isConfirmed) {
        addTask(resp.value,status)
      }    
    }
  

  return ({
    onDragOver,
    dragingTaksId,
    handleonDragOver,
    handleOnDragLeave,
    handleOnDrop,
    handleaddTask,

  })
}
