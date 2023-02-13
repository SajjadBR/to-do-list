import { useCallback, useEffect, useState } from 'react';
import AddTaskForm from './AddTaskForm';
import TasksList from './TasksList';

export type Task = {
  id:number,
  text:String,
  done:boolean,
  date:Date
};

function App() {
  const [tasks,setTasks] = useState<Task[]>([]);

  const addTask = useCallback((text:string) => {

    setTasks(current => {
      // new id is last element's id + 1 ,if no element exist new id will be 0
      const newId = current.length ? current[current.length-1].id+1 : 0;
      return [...current, {id:newId,text,done:false,date:new Date(Date.now())}]
  
    });
  },[]);
  const removeTask = useCallback((id:number) => {
    setTasks(current => {
      const x = [...current]
      return x.filter(value => value.id !== id);
    });
    
  },[]);
  const doTask = useCallback((id:number) => {
    setTasks(current => {
      const x = [...current]
      return x.map(value => {
        if(value.id !== id) return value;
        return {...value,done:!value.done}
      });
    });
    
  },[]);

  useEffect(() => {
    console.log("reading...");
    const data = localStorage.getItem("Tasks");
    if(!data) return;
    const res = JSON.parse(data);
    if(!res.length) return;
    setTasks(res);
  },[]);

  useEffect(() => {
    console.log("saving...");
    localStorage.setItem("Tasks", JSON.stringify(tasks));
  },[tasks]);

  return (
    <div className="App">
      <AddTaskForm addTask={addTask} />
      <TasksList tasks={tasks} removeTask={removeTask} doTask={doTask} />
    </div>
  );
}

export default App;
