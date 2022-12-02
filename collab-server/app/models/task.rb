class Task < ActiveRecord::Base
    belongs_to :project
    # this is used in the GET request that populated the tables, it is in the "include: :user" that it is called
    def user
        id=self.user_id
        User.find(id)
    end
end


