import React, {useState} from 'react';

function Task({task, userData, handleChangeUser, deleteATask, patchTaskName}){
    const [userNameState, setUserName] = useState(task.user.name)
    const [showEditFields, setshowEditFields] = useState(false)
    const [taskName, setTaskName] = useState(task.name)
   
    console.log("task in task module", task);

    function handleUserNameOnChange(e){
       handleChangeUser(task.id, e.target.value);
       console.log(e.target.value)
    }

    //-------------change user assigned to a task--------------

    function handleChangeUser(taskId, userID){
    fetch(`http://localhost:9292/tasks/${taskId}`, {
         method: "PATCH",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify({
          user_id: userID
          }), })
         .then((r) => r.json())
         .then((data)=>{
            let newUser=userData.filter(index=>index.id===data.user_id);
            setUserName(newUser[0].name)
         });
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