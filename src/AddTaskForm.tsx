import { Dispatch, memo, useState } from "react"


function AddTaskForm({dispatch}:{dispatch:Dispatch<any>}) {
    const [editing,setEditing] = useState(false); 

    const [task,setTask] = useState("");
    return (
        <li className={"task-item"+(editing?" editing":"")}>
            {editing?
            <form onSubmit={e => {
                e.preventDefault();
                if(!task)return;
                dispatch({type:"add",text:task});
                setTask("");
                setEditing(false);
            }} className="add-task-form">
                <input type="text" autoFocus className="add-task-input" value={task} onInput={e=>setTask(e.currentTarget.value)} />
                <button type='reset' className="cancel-button" onClick={e=>setEditing(false)}>cancel</button>
                <button type='submit' disabled={!task} className="add-task-button">Add</button>
            </form>:
            <button className="add-task-activator" onClick={e=>setEditing(true)} type="button">Add Task +</button>
            }
        </li>

    )
}

export default memo(AddTaskForm);