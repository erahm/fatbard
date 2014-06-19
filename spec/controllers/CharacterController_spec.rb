ENV['RACK_ENV'] = 'test'

require 'spec_helper'
require_relative '../../models/Character.rb'

describe CharacterController do
    include Rack::Test::Methods

    before :each do
        @characterController = CharacterController.new
    end
end
