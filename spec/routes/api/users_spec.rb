ENV['RACK_ENV'] = 'test'

require 'spec_helper'
require 'json'


def app
    Fatbard::Main
end

describe 'Users' do
    include Rack::Test::Methods

    describe '#POST'
        describe '/api/user' do
            context 'if request is empty' do
                it "should return 400" do
                    post '/api/user'
                    last_response.status.should == 400
                end
            end

            context 'if request is formatted properly' do
                it 'should return 201' do
                    post '/api/user', {
                        :username => 'username',
                        :email => 'email@email.com',
                        :firstName => 'first name',
                        :password => 'i like chicken'
                    }.to_json

                    last_response.status.should == 201
                end

                it 'should return location header of user object' do
                    post '/api/user', {
                        :username => 'username',
                        :email => 'email@email.com',
                        :firstName => 'first name',
                        :password => 'i like chicken'
                    }.to_json

                    last_response.headers['Location'].should == "/api/user/username"
                end
            end
    end
end
