require 'json'
require_relative '../../controllers/UserController.rb'

module Fatbard
    module Routes
        module Api
            class Authentication < Sinatra::Application
                post '/api/authenticate/:username' do
                    content_type :json

                    userController = UserController.new

                    requestData = request.POST
                    validateParams(requestData)

                    isAuthed = userController.authenticate( params[:username], requestData[ "password" ] )

                    if isAuthed
                        haltCode = 200
                        returnData = "{}"
                        session[:userId] = userController.user._id
                    else
                        haltCode = 401
                        returnData = nil
                    end

                    halt haltCode, returnData
                end

                protected
                def validateParams (params)
                    halt 400 if params.length == 0
                end
            end
        end
    end
end
