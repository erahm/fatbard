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

                    begin
                        userController.create(requestData)
                    rescue => error
                        e = error.to_s
                        halt 409 if e == "Username already in use"
                        halt 400, e
                    end

                    user = userController.user
                    halt 201, response.headers[ 'Location' ] = "/api/user/#{user.username}"
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

                put '/api/user/:username' do
                    content_type :json

                    userController = UserController.new
                    requestData = request.body.read
                    validateParams(requestData)

                    begin
                        userController.update(params[:username], requestData)
                    rescue 
                        halt 404 if userController.user == nil
                    end

                    halt 200, { user: filterUser(userController.user) }.to_json
                end

                delete '/api/user/:username' do
                    content_type :json

                    userController = UserController.new
                    documentsAffected = userController.delete(params[:username])

                    if documentsAffected == 1
                        halt 204
                    else
                        halt 404
                    end

                end


                def validateParams (params)
                    halt 400 if params.length == 0
                end

                protected
                def filterUser ( user )
                    return {
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
