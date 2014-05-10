ENV['RACK_ENV'] = 'test'

require 'spec_helper'
require_relative '../../models/User.rb'

describe UserController do
    include Rack::Test::Methods

    before :each do
        @userController = UserController.new
    end

    describe '#createUser' do

        it 'should raise error if parameters are empty' do
            params = {}
            lambda { @userController.createUser(params) }.should raise_exception ArgumentError
        end

        it 'should raise error if username is empty' do
            params = {:email => "email", :username => ""}
            lambda { @userController.createUser(params) }.should raise_error
        end
    end
end
