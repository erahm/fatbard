require_relative '../models/User.rb'

class UserController
    attr_accessor :user

    def createUser ( params )
        if params.empty?
            raise ArgumentError            
        else
            params.each_pair do |key, value|
                if value.to_s.empty?
                    raise "Parameter #{key} is empty"
                else
                    assignValues(key, value)
                end
            end
        end
     end

     protected
     def assignValues ( key, value )
        case key
            when "username"
                @username = value
            when "email"
                @email = value
            when "firstName"
                @firstName = value
            when "password"
                hashPassword(value)
        end
     end

     private
     def hashPassword ( password )

     end
end
