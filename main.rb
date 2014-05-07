require 'sinatra'
require 'mongoid'
require 'json'

configure do 
	Mongoid.load!("./mongoid.yaml")
end

git '/' do

end
