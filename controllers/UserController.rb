require_relative '../models/User.rb'
require 'pbkdf2'
require 'openssl'
require 'mongoid'

class UserController
    Mongoid.load!('./mongoid.yml')
    attr_accessor :user

    def create ( params )
        warn params.to_s
        if params.empty?
            raise ArgumentError
        else
            @user = User.new
            generateSalt
            params.each_pair do |key, value|
                if value.to_s.empty?
                    raise "Parameter #{key} is empty"
                else
                    assignValues(key, value)
                end
            end
            @user.save
        end
    end

    def retrieve ( username )
        @user = User.where(:username => username)
        return @user
    end

    def authenticate( username, password )

    end

     protected
     def assignValues ( key, value )
        case key
            when "username"
                user = User.where(:username => value)
                if user.empty?
                    @user.username = value
                else
                    raise "Username already in use"
                end
            when "email"
                @user.email = value
            when "firstName"
                @user.firstName = value
            when "password"
                @user.password = hashPassword(value)
        end
     end

     protected
     def hashPassword ( password )
        return PBKDF2.new(:password => password, :salt => @user.salt, :iterations => 10000)
     end

     protected
     def generateSalt
        @user.salt = SecureRandom.base64 64
     end
end
