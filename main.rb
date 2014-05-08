require 'sinatra'
require 'mongoid'
require 'json'
require_relative 'controllers/UserController.rb'

set :public_folder, "web"


get '/' do
	send_file File.expand_path('index.html', settings.public_folder)
end

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
