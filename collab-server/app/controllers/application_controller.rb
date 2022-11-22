class ApplicationController < Sinatra::Base
  set :default_content_type, 'application/json'
 
  # -----GET requests-------

  # this GET is not used to populate any data associated with anything
  # it is used soley to populate a dropdown menu which must have a list of all users
  # regardless of whether or not they have a project or a task, that is why
  # it is a standalone GET becasue it must be populated the same way regardless of
  # the state of the database. And this dropdown menue is only seen when we need to 
  # PATCH the new user to the task. 
  get "/users" do
    users=User.all
   users.to_json
  end

  # # this will get a user by a string of its own name, this is needed in the task module 
  # to update the name of the user associate with the task
  # the dropdown menu only provides a string and so for the POST to work we need to find an actual
  # database record for this user based on a strin gof thier name
  get "/users_by_name/:name" do
    user=User.find_by(name: params[:name])
    user.to_json
  end


  get "/projects" do
    projects=Project.all
    projects.to_json(include: {tasks: {include: :user}})
  end


  # ----POST requests-----
  post "/projects" do
    project=Project.create(
    name: params[:name]
    )
    project.to_json
  end

  post "/tasks" do
    task=Task.create(
      name: params[:name],
      completedYN: params[:completedYN],
      user_id: params[:user_id],
      project_id: params[:project_id]
    )
    task.to_json
  end

  # ------ PATCH requests------

  patch '/tasks/:id' do
    task=Task.find(params[:id])
      task.update(
        user_id: params[:user_id]
      )
    task.to_json
  end

  patch '/task_name_change/:id' do
    task=Task.find(params[:id])
    task.update(
      name: params[:name]
    )
    task.to_json
  end

  # ------ DELETE requests --------

  delete '/tasks/:id' do
    task=Task.find(params[:id])
    task.destroy
    task.to_json
  end

  delete '/projects/:id' do
    project=Project.find(params[:id])
    project.destroy
    project.to_json
  end

  delete "/projects_tasks/:project_id" do
    tasks=Task.where(project_id: params[:project_id])
    Task.delete([tasks])
    tasks.to_json
  end
  
end

