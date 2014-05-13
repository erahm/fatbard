require_relative '../models/User.rb'
require 'pbkdf2'
require 'openssl'

class UserController
    attr_accessor :user

    def createUser ( params )
        if params.empty?
            raise ArgumentError
        else
            @user = User.new
            params.each_pair do |key, value|
                if value.to_s.empty?
                    raise "Parameter #{key} is empty"
                else
                    generateSalt
                    assignValues(key, value)
                end
            end
            # for now we'll run this check. later i'll mock mongo in the specs
            @user.save unless ENV['RACK_ENV'] == 'test'
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

     protected
     def hashPassword ( password )
        return PBKDF2.new(:password => password, :salt => @user.salt, :iterations => 10000)
     end

     protected
     def generateSalt
        @user.salt = OpenSSL::Random.random_bytes 128
     end
end
