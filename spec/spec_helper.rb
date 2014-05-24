require_relative '../main.rb'
require_relative '../routes/api/Users.rb'
require_relative '../routes/api/Authentication.rb'
require_relative '../controllers/UserController.rb'
require_relative '../models/User.rb'

require 'rspec'
require 'rack/test'
require 'mongoid'
require 'mongoid-rspec'
require 'database_cleaner'

RSpec.configure do |config|
  config.include Mongoid::Matchers
end
