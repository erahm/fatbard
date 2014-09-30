require 'json'
require_relative '../../controllers/UserController.rb'

module Fatbard
    module Routes
        module Api
            class Users < Sinatra::Application
                post '/api/user' do
                    content_type :json

                    userController = UserController.new

                    requestData = request.POST
                    validateParams(requestData)
                    username = requestData[:username]

                    if userController.retrieve(username) == nil
                        userController.create(requestData)
                        user = userController.user
                        haltCode = 201
                        responseData = "/api/user/#{user.username}"
                        responseType = 'Location'
                    else
                        haltCode = 403
                        responseType = 'Error'
                        responseData = 'User already exists'
                    end

 
                    halt haltCode, response.headers[ responseType ] = responseData
                end

                get '/api/user/:username' do
                    content_type :json

                    userController = UserController.new
                    validateParams(params)
                    user = userController.retrieve(params[:username])

                    if user == nil
                        halt 404
                    else
                        halt 200, { user: filterUser( user ) }.to_json
                    end
                end

                patch '/api/user/:username' do
                    content_type :json

                    userController = UserController.new
                    requestData = request.POST
                    validateParams(requestData)

                    responseData = nil

                    user = userController.retrieve(params[:username])

                    if userController.user == nil
                        haltCode = 404
                    elsif session[:userId] != userController.user._id
                        haltCode = 409
                        responseData = 'username already in use'     
                    else
                        userController.update(params[:username], requestData)
                        haltCode = 200
                        responseData = { user: filterUser(userController.user) }.to_json                   
                    end

                    halt haltCode, responseData

                end

                delete '/api/user/:username' do
                    content_type :json

                    userController = UserController.new
                    haltCode = 200

                    begin
                        userController.delete(params[:username])
                    rescue
                        haltCode = 404
                    end

                    halt haltCode

                end


                def validateParams (params)
                    halt 400 if params.length == 0
                end

                protected
                def filterUser ( user )
                    {
                        :_id => user['_id'],
                        :username => user['username'],
                        :email => user['email'],
                        :firstName => user['firstName']
                    }
                end
            end
        end
    end
end
