import React, {useState} from 'react';

function Task({task, userData, handleChangeUser, deleteATask, patchTaskName}){
    const [userNameState, setUserName] = useState(task.user.name)
    const [showEditFields, setshowEditFields] = useState(false)
    const [taskName, setTaskName] = useState(task.name)
   

    function handleUserNameOnChange(e){
        let updatedUserName=userData.filter(
            (index)=>{
                if(index.id===parseInt(e.target.value)){
                    return index
                }
            }
        )
        setUserName(updatedUserName[0].name)
       handleChangeUser(task.id, e.target.value, updatedUserName[0].name);
    }

    //----------this function allows the edit fields for a task to be shown------

    function showHideEditTask(){
        if (showEditFields===false){
             setshowEditFields(true)
        } 
        else if (showEditFields===true){
            setshowEditFields(false);
            patchTaskName(taskName, task.id);
        }
    }

    //---------this function is called when the task name input is changed-------
    function handleTaskNameOnChange (e){
        setTaskName(e.target.value)
    }

    

    function handleDeleteClick(){
        if (window.confirm('are you sure you want to delete this task?')===true){
            setshowEditFields(false)
            deleteATask(task.id)
        }
    }


    return(
        <div className='task'>
            {`name: ${task.name}`}
            <br></br>
            {` assigned to: ${task.user.name}`}
            <br></br>
            {showEditFields===false? <button onClick={showHideEditTask}>edit task</button>
            : 
                <div>
                    <select onChange={handleUserNameOnChange}>
                    <option>{userNameState}</option>
                            {userData.map((user)=>{
                                if(user.name !=userNameState){
                                    return(<option value={user.id}>{user.name}</option>)
                                }
                            })}
                        </select>
                        <br></br>
                        <input onChange={handleTaskNameOnChange} placeholder='change task name here'></input>
                        <br></br>
                        <button onClick={handleDeleteClick}>delete task</button>
                        <br></br>
                        <button onClick={showHideEditTask}>close edit fields</button>
                </div>}
        </div>
    )
} 

export default Task;