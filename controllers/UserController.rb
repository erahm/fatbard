require_relative '../models/User.rb'
require 'pbkdf2'

class UserController
    attr_accessor :user

    def initialize
        @salt = '4rh35qvQ8r'
    end

    def createUser ( params )
        if params.empty?
            raise ArgumentError
        else
            @user = User.new
            params.each_pair do |key, value|
                if value.to_s.empty?
                    raise "Parameter #{key} is empty"
                else
                    assignValues(key, value)
                end
            end
            #@user.save
        end
     end

     protected
     def assignValues ( key, value )
        case key
            when "username"
                @user.username = value
            when "email"
                @user.email = value
            when "firstName"
                @user.firstName = value
            when "password"
                @user.password = hashPassword(value)
        end
     end

     private
     def hashPassword ( password )
        return PBKDF2.new(:password => password, :salt => @salt, :iterations => 10000)
     end
end
