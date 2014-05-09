require 'sinatra/base'
require_relative 'routes/api/Users.rb'

module Fatbard
	class Main < Sinatra::Base
		configure do
			set :public_folder => "web"
		end

		use Rack::Deflater

		get '/' do
			send_file File.expand_path('index.html', settings.public_folder)
		end

		use Routes::Api::Users
	end
end
