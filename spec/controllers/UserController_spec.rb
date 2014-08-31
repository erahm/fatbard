ENV['RACK_ENV'] = 'test'

require 'spec_helper'
require_relative '../../models/User.rb'

describe UserController do
    include Rack::Test::Methods

    before :each do
        @userController = UserController.new
    end

    describe '#create' do
        
        context 'when username parameter is not empty' do
            it 'should assign value to user.username' do
                params = {:username => 'joebob'}
                User.stub(:save) {}

                @userController.instance_variable_set(:@user, User.new)
                @userController.create(params)

                user = @userController.instance_variable_get(:@user)
                user.username.should == params['username']
            end
        end
    end

    describe '#retrieve' do

        context 'when username is passed' do
            it 'should return a user object' do
                username = 'username'
                mockUser = User.create(username: username, password: 'password', firstName: 'joebob', email: 'email@email.com')
                User.stub(:where).with(username: username).and_return([mockUser])

                user = @userController.retrieve(username)

                user.should be_an_instance_of User
            end
        end
    end

end
