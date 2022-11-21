class Task < ActiveRecord::Base
    belongs_to :project

    def user
        id=self.user_id
        User.find(id)
    end
end