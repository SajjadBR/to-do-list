import { Dispatch } from "react"
import AddTaskForm from "./AddTaskForm"
import { Task } from "./App"
import TaskItem from "./TaskItem"

export default function TasksList({tasks,dispatch}:{tasks:Task[],dispatch:Dispatch<any>}) {
    const tasksUI = tasks.map(value => <TaskItem key={value.id} dispatch={dispatch} task={value} />)
    return (
        <ul className="tasks-list">
            {tasksUI}
            <AddTaskForm dispatch={dispatch}/>
        </ul>
    )
}
