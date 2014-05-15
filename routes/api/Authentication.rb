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

                    halt 401 if !isAuthed
                    halt 200, "{}"
                end

                def validateParams (params)
                    halt 400 if params.length == 0
                end
            end
        end
    end
end
