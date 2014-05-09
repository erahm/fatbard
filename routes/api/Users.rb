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
                end

                def parseRequest (request)
                    return JSON.parse(request.body.string)
                end

                def validateParams (params)
                    halt 400 if params.length == 0
                end
            end
        end
    end
end
