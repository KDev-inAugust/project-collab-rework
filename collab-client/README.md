# 'project-collab-app'

This app is a simple and straightforward platform designed to delegate team-member responsibility for tasks across a project. This app utilizes a React frontend. Once a project is created the associated task cards are visually grouped inside the task field. The tasks themsleves are assigned a name and a user from the list of available users in the database. Tasks can be fully edited by changing task name, user associated with the task, or by deleting the task altogether. Projects can also be deleted which will delete all task data associated with that project from the database.

##Short Demo Video

https://www.youtube.com/watch?v=oQrHjB4ux_4

##the backend

This project makes use of Sinatra and Active Record to interact with an SQL database.  The routes are as follows.

##-GET-

/users

returns all users.

/projects

returns all project data and associated tasks and thier users

/users_by_name/:name

returns a user entry by a string of its own name.

/task_user/:id

returns a user entry by its task id.

##-POST-

/projects

creates a new project entry with only a name.

/tasks

creates a new task with task name and user assigned to the task.

##-PATCH-

/tasks/:id

finds a task by its id and updates the user id associated to it.

/task_name_change/:id

finds a taks by its id and updates the task name.

##-DELETE-

/tasks/:id

finds a task by its id and deletes its record from the database.

/projects/:id

finds a project by its id and deletes its record from the database.

/projects_tasks/:project_id

finds a project by its id and deletes all the tasks with that project id. This path is meant to be used in conjunction with the /projects/:id path to fully delete all information related to that project. This will keep tasks from remaining on the database if thier associated project is deleted. If this path was not executed the tasks would remain on the database and the front end would not be able to access them. I did make this a separate path, however, to allow for future funtionality where tasks would potentially be independent of projects. This would allow for tasks to be added and grouped into projects later.