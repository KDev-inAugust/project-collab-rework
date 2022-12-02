class Project < ActiveRecord::Base
    has_many :tasks

    # def tasks
    #     Task.where(project_id: self.id)
    # end
end