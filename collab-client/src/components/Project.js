 
import React, {useState} from 'react';
import Task from './Task';


function Project({project, addTaskToProject, userData, deleteProject}){


    const [showProjectEdit, setShowProjectEdit]=useState(false)
    const [newTaskName, setNewTaskName]=useState("")
    const [newUserId, setNewUserId]=useState("")  
    const [taskArray, setTaskArray]=useState(project.tasks)



     //------show task edit fields-----------
      function toggleTaskEditFields(){
        showProjectEdit===true? setShowProjectEdit(false) : setShowProjectEdit(true);
      }
     
    //-------- add a task to this project---------
    function handleAddTask (){
        addTaskToProject(newTaskName, newUserId, project.id)
      setShowProjectEdit(false)
    } 

  function addTaskToProject(newTaskName, newUserId, projectId){
  fetch('http://localhost:9292/tasks',{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: newTaskName,
      completedYN: false,
      user_id: newUserId,
      project_id: projectId,
      })
  }).then(res=>res.json())
  .then((data)=>setTaskArray([...taskArray,data]));
  }

    //---------------------- set new task name on create--------------

    function handleNewTaskName(e){
      setNewTaskName(e.target.value)
    }

    function handleNewTaskUserName(e){
      setNewUserId(e.target.value)
    }

    //----------- -PATCH- name for task --------------
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
      .then((data)=>{
        const newTaskArray=taskArray.map(
          (index)=>{
            if (index.id===data.id){
              return {
                ...index,
                name: taskName
              }}
              else {return index}
          }
        )
        setTaskArray(newTaskArray)
      });
      }
    
        //-------------change user assigned to a task--------------

    function handleChangeUser(taskId, userID, updatedUserName){
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
              const update=taskArray.map(
                (index)=>{
                  if (index.id===data.id){
                    return{
                      ...index,
                      user: {name: `${updatedUserName}`}
                    }
                  }
                  else {return index}
                }
                )
                setTaskArray(update);
                console.log(update)
           }
           );
      }

    //-------------delete a task--------------
      function deleteATask(id){
        fetch(`http://localhost:9292/tasks/${id}`,{
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }).then(res=>res.json()
      .then(data=>
        {let newArray=taskArray.filter(task=>task.id!==data.id);
          setTaskArray(newArray);
        }))}

    //------------handle delete current project---------------
    
      function handleDeleteProject(){
        if (window.confirm('are you sure you want to delete this project?')===true){
          deleteProject(project.id);
        }
      }

      //-------------allow adding of Project with no tasks-----
      if ("tasks" in project===false){
        project.tasks=[]
      }

      //----------the project Return------------
    return (
        <div id="project_wrapper">
          <h3>{`${project.name}`}</h3>
            <div id="project_container">
            {taskArray.map(task=>{
          return(
              <div>
              <Task 
              task={task}
              deleteATask={deleteATask}
              patchTaskName={patchTaskName}
              userData={userData}
              handleChangeUser={handleChangeUser}
              />
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
                  <option>choose a user</option>
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