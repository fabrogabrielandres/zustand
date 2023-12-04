import { JiraTasks } from '../../components';
import { useTasksStore } from '../../store/task/task.store';

export const JiraPage = () => {

  const taskDone = useTasksStore((state) => state.getTaskByStatus('done'));
  const taskInProgress = useTasksStore((state) => state.getTaskByStatus('in-progress'));
  const taskOpen = useTasksStore((state) => state.getTaskByStatus('open'));

  

  return (
    <>
      <h1>Tareas</h1>
      <p>Manejo de estado con objectos de Zustand</p>
      <hr />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <JiraTasks tasks={ taskOpen } title='Pendientes' value='open' />
          
          <JiraTasks tasks={ taskInProgress } title='Avanzando' value='in-progress' />
          
          <JiraTasks tasks={ taskDone } title='Terminadas' value='done' />

      </div>
    </>
  );
};