import { Task } from './App'

export default function TaskItem({task,remove,doTask}:{task:Task,remove:(()=>void),doTask:(()=>void)}) {
    return (
        <li className={'task-item' + (task.done? " done":"")}>
            <span className='task-text'>{task.text}</span>
            <span className='task-date'>{task.date.toLocaleString()}</span>
            <div className='task-buttons'>
                <button className='task-delete' type="button" onClick={remove}>Delete</button>
                <button className='task-edit' type="button">Edit</button>
                <button className='task-do' type="button" onClick={doTask}>Done</button>
            </div>
        </li>
    )
}
