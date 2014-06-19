ENV['RACK_ENV'] = 'test'

require 'spec_helper'
require_relative '../../models/Campaign.rb'

describe CampaignController do
    include Rack::Test::Methods

    before :each do
        @campaignController = CampaignController.new
    end
end
