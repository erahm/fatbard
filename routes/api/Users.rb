require_relative '../../controllers/UserController.rb'

module Fatbard
    module Routes
        module Api
            class Users < Sinatra::Application
                post '/api/user' do
                    content_type :json


                    userController = UserController.new

                    begin
                        requestData = parseRequest(request)
                        validateParams(requestData)
                        userController.createUser(requestData)
                    rescue
                        halt 400
                    end

                    user = userController.user
                    halt 201, {:headerLocation => "/api/user/id/#{user._id}"}.to_json
                end

                def parseRequest (request)
                    return JSON.parse(request.body.string)
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
