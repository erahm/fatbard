ENV['RACK_ENV'] = 'test'

require 'spec_helper'
require 'json'


def app
    Fatbard::Main
end

describe 'Authentication' do
    include Rack::Test::Methods

    describe '#POST'
        describe '/api/authenticate' do
            context 'if request is empty' do
                it "should return 404" do
                    post '/api/authenticate'
                    last_response.status.should == 404
                end
            end

            context 'if request is formatted properly' do
                it 'should return 401' do
                    post '/api/authenticate/arandomname', {
                        :password => 'i like chicken'
                    }

                    last_response.status.should == 401
                end

                it 'should return 200' do
                    post '/api/user', {
                        :username => 'george',
                        :email => 'email@email.com',
                        :firstName => 'first name',
                        :password => 'password'
                    }

                    post '/api/authenticate/george', {
                        :password => 'password'
                    }

                    last_response.status.should == 200
                end
            end
    end
end
