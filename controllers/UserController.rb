require_relative '../models/User.rb'

class UserController

    def createUser (params)
        user = User.new

        params.each do |param|
            if param.empty?
                raise "Parameter is empty"
            end
        end
     end
end
