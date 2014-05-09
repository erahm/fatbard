ENV['RACK_ENV'] = 'test'

require_relative '../main.rb'
require_relative '../routes/api/Users.rb'
require 'rspec'
require 'rack/test'

def app
    Fatbard::Main
end

describe 'main' do
    include Rack::Test::Methods

    describe '/' do
        it "should load the home page" do
            get '/'
            last_response.status.should == 200
        end
    end

    describe '/api/user' do
        it "should return 400 if request is empty" do
            post '/api/user'
            last_response.status.should == 400
        end
    end
end
