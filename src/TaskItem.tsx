import { Dispatch, useCallback, useState } from 'react'
import { Task } from './App'

export default function TaskItem({task,dispatch}:{task:Task,dispatch:Dispatch<any>}) {
    const [editing,setEditing] = useState(false);

    const edit = useCallback((text:string) => {
        if(!text) return setEditing(false);
        if(text === task.text) return setEditing(false);

        dispatch({type:"edit", id:task.id,text});
        setEditing(false);
    },[task,dispatch]);

    return (
        <li className={'task-item' + (task.done? " done":"") + (editing?" editing":"")}>
            {editing?
            <input autoFocus className='task-text input' type="text" defaultValue={task.text} onBlur={e=>edit(e.target.value)} />:
            <span className='task-text' onDoubleClick={e=>setEditing(true)}>{task.text}</span>

            }

            <span className='task-date'>{new Date(task.date).toLocaleString()}</span>
            <div className='task-buttons'>
                <button className='task-delete' type="button" onClick={e=>dispatch({type:"remove",id:task.id})}>Delete</button>
                <button className='task-do' type="button" onClick={e=>dispatch({type:"do",id:task.id})}>Done</button>
            </div>
        </li>
    )
}
