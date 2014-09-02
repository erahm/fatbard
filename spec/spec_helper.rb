require_relative '../main.rb'
require_relative '../routes/api/Users.rb'
require_relative '../routes/api/Authentication.rb'
require_relative '../controllers/UserController.rb'
require_relative '../controllers/CampaignController.rb'
require_relative '../controllers/CharacterController.rb'
require_relative '../controllers/JournalEntryController.rb'
require_relative '../models/User.rb'
require_relative '../models/Campaign.rb'
require_relative '../models/Character.rb'
require_relative '../models/JournalEntry.rb'

require 'rspec'
require 'rack/test'
require 'mongoid'
require 'mongoid-rspec'
require 'database_cleaner'

RSpec.configure do |config|
  config.include Mongoid::Matchers
end

def session
  last_request.env['rack.session']
end
