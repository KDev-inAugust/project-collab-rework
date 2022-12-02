
import React, {useState} from 'react';

function AddProj({handleAddProject}){

    const[text, setText]=useState("")

    function handleSetText(e){
        setText(e.target.value);
    }

    function handleClick(e){
        e.preventDefault();
        handleAddProject(text)
    }

   

    return(
        <div>
            <h2>Add Project</h2>
            <form onSubmit={handleAddProject}>
                <input type="text" onChange={handleSetText} placeholder="project name"></input>
                <button onClick={handleClick}>add project</button>
            </form>
            
        </div>
    )
}

export default AddProj