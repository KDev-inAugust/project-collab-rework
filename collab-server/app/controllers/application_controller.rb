class ApplicationController < Sinatra::Base
  set :default_content_type, 'application/json'
 
  # -----GET requests-------
  get "/users" do
    users=User.all
   users.to_json
  end

  # get "/tasks" do
  #   tasks=Task.all
  #   tasks.to_json
  # end

  # # this will get a user by a string of its own name
  # get "/users_by_name/:name" do
  #   user=User.find_by(name: params[:name])
  #   user.to_json
  # end

  # # this will take a task id and return its user
  # get "/task_user/:id" do
  #   user=Task.find(params[:id]).user
  #   user.to_json
  # end

  get "/projects" do
    projects=Project.all
    projects.to_json(include: {tasks: {include: :user}})
  end

  # # this will take a project id and get all of its tasks
  # get "/project_tasks/:id" do
  #   project=Project.find(params[:id]).tasks
  #   project.to_json
  # end

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

