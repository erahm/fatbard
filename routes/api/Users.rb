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
                        userController.createUser(requestData)
                    rescue => error
                        halt 400, error.to_s
                    end

                    user = userController.user
                    halt 201, {:headerLocation => "/api/user/username/#{user.username}"}.to_json
                end

                get '/api/user/username/:username' do
                    content_type :json

                    usercontroller = UserController.new
                    validateParams(params)
                    user = usercontroller.retrieveUser(params[:username])

                    if user.empty?
                        halt 404
                    else
                        halt 200, user.to_json
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
