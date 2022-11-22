
import React, {useEffect, useState} from 'react';
import '../App.css';
import AddProj from './AddProj';
import Project from './Project';

function App() {
  const [projectData, setProjectData]=useState([])
  const [userData, setUserData]=useState([])
  const [deletedProject, setDeletedProject]=useState([])
  const [addedTask, setAddedTask]=useState([])
  const [deletedTask, setDeletedTask]=useState([])
  const [patchedTask, setPatchedTask]=useState([])

//---------get project data--------
useEffect(()=>{
  fetch("http://localhost:9292/projects")
  .then(res=>res.json())
  .then(data=>setProjectData(data));
},[deletedProject, addedTask, deletedTask, patchedTask])

//--------get user data--------------

useEffect(()=>{
  fetch("http://localhost:9292/users")
  .then(res=>res.json())
  .then(data=>setUserData(data));
},[])

//-----------add -POST- new project to DB------------

function handleAddProject(name){
  fetch("http://localhost:9292/projects",{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
    })
    }).then(res=>res.json())
    .then(data=>setAddedTask(data))
}

//----------- -DELETE- a Project from DB-----------

function deleteProject(id){
  fetch(`http://localhost:9292/projects_tasks/${id}`,{
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then(res=>res.json())
  .then(data=>setDeletedProject(data))

  fetch(`http://localhost:9292/projects/${id}`,{
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then(res=>res.json())
  .then(data=>setDeletedProject(data))
}

//-------------change user assigned to a task--------------

function handleChangeUser(taskId, userID){
  console.log(taskId, userID)
  fetch(`http://localhost:9292/tasks/${taskId}`, {
       method: "PATCH",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify({
        user_id: userID
        }), })
       .then((r) => r.json())
       .then((data)=>console.log("this is the patch data=> ", data));
}

//------------add a task to a project--------

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
      project_id: projectId
      })
  }).then(res=>res.json())
  .then(data=>setAddedTask(data));
}

//----------- -PATCH- name for task --------------
      function patchTaskName(taskName, id){
        console.log(taskName, id)
        fetch(`http://localhost:9292/task_name_change/${id}`,{
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
          name: taskName
          }),})
      .then(res=>res.json())
      .then(data=> setPatchedTask(data));
      }

//-------------delete a task--------------
function deleteATask(id){
  fetch(`http://localhost:9292/tasks/${id}`,{
  method: "DELETE",
  headers: {
    "Content-Type": "application/json",
  },
}).then(res=>res.json()
.then(data=>setDeletedTask(data)))
}

//-----------update the database------------

  return (
    <div>
      <h1>Task Collaboration Platform</h1>
      <AddProj handleAddProject={handleAddProject}/>
      {
        projectData.map((project)=>{
          return(
            <Project 
            project={project} 
            handleChangeUser={handleChangeUser}
            deleteProject={deleteProject}
            userData={userData}
            addTaskToProject={addTaskToProject}
            deleteATask={deleteATask}
            patchTaskName={patchTaskName}
            />
          )
        })
      }
   </div>
  );
}

export default App;
