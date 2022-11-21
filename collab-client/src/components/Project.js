 
import React, {useEffect, useState} from 'react';
import Task from './Task';



function Project({project, userData, handleChangeUser, deleteProject}){

    const [associatedTaskData, setAssociatedTaskData]=useState([])
    const [deletedTask, setDeletedTask]=useState([])
    const [showProjectEdit, setShowProjectEdit]=useState(false)
    const [newTaskName, setNewTaskName]=useState("")
    const [newUserId, setNewUserId]=useState("")
    const [addedTask, setAddedTask]=useState([]) 
    const [changedTaskName, setChangedTaskNAme]=useState("")
    
    console.log("I reloaded")

    useEffect(()=>{
        fetch(`http://localhost:9292/project_tasks/${project.id}`)
        .then(res=>res.json())
        .then(data=>{setAssociatedTaskData(data); console.log(data)});
        console.log("this is the associated task data", associatedTaskData)
      },[addedTask, deletedTask, changedTaskName, project])

     //------show task edit fields-----------
      function toggleTaskEditFields(){
        showProjectEdit===true? setShowProjectEdit(false) : setShowProjectEdit(true);
      }
     
    //-------- add a task to this project---------
      function addTaskToProject(){
        
        fetch('http://localhost:9292/tasks',{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: newTaskName,
            completedYN: false,
            user_id: newUserId,
            project_id: project.id
            })

        }).then(res=>res.json())
        .then(data=>setAddedTask(data));
        setShowProjectEdit(false)
      }

// --------the delete a task function---------
function deleteATask(id){
  fetch(`http://localhost:9292/tasks/${id}`,{
  method: "DELETE",
  headers: {
    "Content-Type": "application/json",
  },
}).then(res=>res.json()
.then(data=>setDeletedTask(data)))
}

//-------------- -PATCH- name for task --------------
      function patchTaskName(taskName, id){
        fetch(`http://localhost:9292/task_name_change/${id}`,{
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
          name: taskName
          }),})
      .then(res=>res.json())
      .then(data=> setChangedTaskNAme(data));
      }

  
    // ---------------set username for new task-------------
      
      function handleNewTaskUserName(e){
        fetch(`http://localhost:9292/users_by_name/${e.target.value}`)
        .then(res=>res.json())
        .then(data=>setNewUserId(data.id))
        console.log(newUserId)
      }
    //---------------------- set new task name --------------

    function handleNewTaskName(e){
      setNewTaskName(e.target.value)
      console.log(e.target.value)
    }
//------------handle delete current project---------------
    
      function handleDeleteProject(){
        if (window.confirm('are you sure you want to delete this project?')===true){
          deleteProject(project.id)
        }
      }

    return (
        <div id="project_wrapper">
          <h3>{`${project.name}`}</h3>
            <div id="project_container">
            {/* first grab all the tasks in this project */}
            {associatedTaskData.map(task=>{
                return(
                    <div>
                    <Task 
                    id={task.id} 
                    name={task.name} 
                    user_id={task.user_id} 
                    userData={userData}
                    handleChangeUser={handleChangeUser}
                    deleteATask={deleteATask}
                    patchTaskName={patchTaskName}/>
                    </div>
                  )
              })}
            </div>
            {/* Project Edit Toggle and Properties */}
            {showProjectEdit===false ? 
            <div>
              <button onClick={toggleTaskEditFields}>add a task</button>
              <br></br>
              <button onClick={handleDeleteProject}>delete this project</button>
            </div> 
             :
            <div>
              <input onChange={handleNewTaskName} placeholder='add task name'></input>
              <br></br>
              <select onChange={handleNewTaskUserName}>
                  <option value="" disabled selected>choose a person for this task</option>
                  {userData.map((index)=>
                    <option>{index.name}</option>)}
              </select>
              <br></br>
              <button onClick={addTaskToProject}>add and close edit field</button> 
              <br></br>
              <button onClick={toggleTaskEditFields}>cancel changes and close</button>
              
            </div>
            }
        </div>
    )
}

export default Project;