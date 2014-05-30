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

                patch '/api/user/:username' do
                    content_type :json

                    userController = UserController.new
                    requestData = request.POST
                    validateParams(requestData)

                    responseData = nil

                    begin
                        userController.update(params[:username], requestData)
                    rescue => error
                        haltCode = 409 if error.to_s == "Username already in use"
                    end

                    if userController.user == nil
                        haltCode = 404
                    else
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
