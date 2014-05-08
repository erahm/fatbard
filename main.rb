require 'sinatra'
require 'mongoid'
require 'json'

set :public_folder, "web"

get '/' do
	send_file File.expand_path('index.html', settings.public_folder)
end
