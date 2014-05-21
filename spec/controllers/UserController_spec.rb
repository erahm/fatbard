ENV['RACK_ENV'] = 'test'

require 'spec_helper'
require_relative '../../models/User.rb'

describe UserController do
    include Rack::Test::Methods

    before :each do
        @userController = UserController.new
        DatabaseCleaner[:mongoid].start
    end

    after :each do
        DatabaseCleaner[:mongoid].clean
    end

    describe '#createUser' do

        context 'when parameters are empty' do
            it 'should raise error' do
                params = {}
                lambda { @userController.create(params) }.should raise_exception ArgumentError
            end
        end

        context 'when a parameter is empty' do
            it 'should raise error' do
                params = {:email => "email", :username => ""}
                lambda { @userController.create(params) }.should raise_error
            end
        end

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
end
