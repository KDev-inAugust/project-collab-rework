
import React, {useEffect, useState} from 'react';
import '../App.css';
import AddProj from './AddProj';
import Project from './Project';

function App() {
  const [projectData, setProjectData]=useState([])
  const [userData, setUserData]=useState([])

//---------get project data--------
useEffect(()=>{
  fetch("http://localhost:9292/projects")
  .then(res=>res.json())
  .then(data=>setProjectData(data));
},[])

//--------get user data--------------

useEffect(()=>{
  fetch("http://localhost:9292/users")
  .then(res=>res.json())
  .then(data=>setUserData(data));
},[])

//---------- -POST- new project to DB------------

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
    .then(data=>{setProjectData([...projectData, data])});
  }

//----------- -DELETE- a Project from DB-----------

function deleteProject(id){
  fetch(`http://localhost:9292/projects_tasks/${id}`,{
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })

  fetch(`http://localhost:9292/projects/${id}`,{
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then(res=>res.json())
  .then(data=>{
    console.log(data)
    let newProjectList = projectData.filter((project)=>project.id!==data.id)
    setProjectData(newProjectList);
  });
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
            deleteProject={deleteProject}
            userData={userData}
            />
          )
        })
      }
   </div>
  );
}

export default App;
