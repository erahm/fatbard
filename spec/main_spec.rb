require_relative '../main.rb'
require 'rack/test'

set :environment, :test

def app
    Sinatra::Application
end

describe 'main' do
    include Rack::Test::Methods

    it "should load the home page" do
        get '/'
        last_response.status.should == 200
    end

    it "should return 400 if request is empty" do
        post '/api/user'
        last_response.status.should == 400
    end
end
