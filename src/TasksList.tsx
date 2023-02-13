import { Task } from "./App"
import TaskItem from "./TaskItem"

export default function TasksList({tasks,removeTask,doTask}:{tasks:Task[],removeTask:((id:number)=>void),doTask:((id:number)=>void)}) {
    const tasksUI = tasks.map(value => <TaskItem key={value.id} doTask={()=>doTask(value.id)} remove={()=>removeTask(value.id)} task={value} />)
    return (
        <ul className="tasks-list">
            {tasksUI}
        </ul>
    )
}
