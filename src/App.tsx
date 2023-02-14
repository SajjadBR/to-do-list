import { Reducer, useEffect, useMemo, useReducer, useState } from 'react';
import TasksList from './TasksList';

export type Task = {
  id:number,
  text:string,
  done:boolean,
  date:Date
};

const reducer:Reducer<Task[],any> = (state,action) => {
  switch (action.type) {
    case "add":
      // new id is last element's id + 1 ,if no element exist new id will be 0
      const newId = state.length ? state[state.length-1].id+1 : 0;
      const newTask:Task = {
        id:newId,
        text:action.text,
        done:false,
        date:new Date(Date.now())
      }
      return [...state, newTask];
    case "remove":
      return state.filter(value => value.id !== action.id);
    case "do":
      return state.map(v => {
        if(v.id !== action.id) return v;
        return {...v,done:!v.done}
      });
    case "load":
      return action.tasks;
    case "edit":
      return state.map(v => {
        if(v.id !== action.id) return v;
        return {...v,text:action.text}
      })
    default:
      return state;
  }
}

function App() {
  //all of the tasks
  const [tasks,dispatch] = useReducer<Reducer<Task[],any>>(reducer,[]); 
  // the search query
  const [query,setQuery] = useState("");

  // tasks to be shown on screen
  const UITasks:Task[] = useMemo(() => {
    if(!query) return tasks;
    return tasks.filter(v => v.text.includes(query));
  },[tasks,query]);

  // get saved tasks from local storage
  useEffect(() => {
    console.log("reading...");
    const data = localStorage.getItem("Tasks");
    if(!data) return;
    const res = JSON.parse(data);
    if(!res.length) return;
    dispatch({type:"load",tasks:res})
  },[]);

  // save tasks to local storage
  useEffect(() => {
    console.log("saving...");
    localStorage.setItem("Tasks", JSON.stringify(tasks));
  },[tasks]);

  return (
    <div className="App">
      <h2>To Do List</h2>
      <br />
      <input className='search-tasks' value={query} onInput={e=>setQuery(e.currentTarget.value)} type="search" placeholder='Search' />
      <TasksList tasks={UITasks} dispatch={dispatch} />
      <div>note:Double click on a task's title to edit it.</div>
    </div>
  );
}

export default App;
