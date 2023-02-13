import { memo, useState } from "react"


function AddTaskForm({addTask}:{addTask:((task:string)=>void)}) {
    const [task,setTask] = useState("");
    return (
        <form className='add-task-form'
        onSubmit={e => {
            e.preventDefault();
            if(!task)return;
            addTask(task);
            setTask("")
            }}>
            <label htmlFor="addTask">New Task:</label>
            <input type="text" id='addTask' className="add-task-input" value={task} onInput={e=>setTask(e.currentTarget.value)} />
            <button type='submit' disabled={!task} className="add-task-button">+ add</button>
        </form>
    )
}

export default memo(AddTaskForm);