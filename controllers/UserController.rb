require_relative '../models/User.rb'

class UserController

    def createUser (params)
        user = User.new

        params.each_pair do |key, value|
            if value.to_s.empty?
                raise "Parameter #{key} is empty"
            else

            end
        end
     end
end
