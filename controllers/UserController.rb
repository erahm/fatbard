require_relative '../models/User.rb'
require 'active_support'
require 'pbkdf2'
require 'openssl'
require 'mongoid'

class UserController
    Mongoid.load!('./mongoid.yml')
    attr_accessor :user

    def create ( params )
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
        @user = User.where(username: username).first
        return @user
    end

    def update ( params )
        if params.empty?
            raise ArgumentError
        else
            retrieve(params[:username])
            @user.update(
                username: params[:username], 
                password: params[:password], 
                firstName: params[:firstName], 
                email: params[:email]
            )
        end
    end

    def authenticate( username, password )
        self.retrieve( username )
        thisPass = @user != nil ? hashPassword( password ) : nil
        return false if !thisPass or (thisPass.hex_string != @user.password)
        return true
    end

     protected
     def assignValues ( key, value )
        case key
            when "username"
                user = User.where(username: value)
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
                @user.password = hashPassword(value).hex_string
        end
     end

     protected
     def hashPassword ( password )
        return PBKDF2.new do |p|
            p.password = password
            p.salt = @user.salt
            p.iterations = 10000
            p.hash_function = OpenSSL::Digest::SHA512
        end
     end

     protected
     def generateSalt
        @user.salt = SecureRandom.base64 64
     end
end
