 
import React, {useEffect, useState} from 'react';
import Task from './Task';



function Project({project, patchTaskName, handleChangeUser, deleteATask, addTaskToProject, userData, deleteProject}){

    const [showProjectEdit, setShowProjectEdit]=useState(false)
    const [newTaskName, setNewTaskName]=useState("")
    const [newUserId, setNewUserId]=useState("")  

    console.log(`Project ${project}`)


     //------show task edit fields-----------
      function toggleTaskEditFields(){
        showProjectEdit===true? setShowProjectEdit(false) : setShowProjectEdit(true);
      }
     
    //-------- add a task to this project---------
  function handleAddTask (){
      addTaskToProject(newTaskName, newUserId, project.id)
    setShowProjectEdit(false)
  }

    //---------------------- set new task name --------------

    function handleNewTaskName(e){
      setNewTaskName(e.target.value)
    }

    function handleNewTaskUserName(e){
      setNewUserId(e.target.value)
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
            {project.tasks.map(task=>{
                return(
                    <div>
                    <Task 
                    id={task.id} 
                    name={task.name} 
                    user_id={task.user_id} 
                    userName={task.user.name}
                    handleChangeUser={handleChangeUser}
                    userData={userData}
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
              <p>choose a person for this task</p>
              <select onChange={handleNewTaskUserName}>
                  
                  {userData.map((user)=>
                    <option value={user.id}>{user.name}</option>)}
              </select>
              <br></br>
              <button onClick={handleAddTask}>add and close edit field</button> 
              <br></br>
              <button onClick={toggleTaskEditFields}>cancel changes and close</button>
              
            </div>
            }
        </div>
    )
}

export default Project;