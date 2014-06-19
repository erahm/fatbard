require_relative '../models/Campaign.rb'
require 'active_support'
require 'mongoid'

class CampaignController
    Mongoid::load!('.mongoid.yml')
    attr_accessor :campaign

    def retrieve ( id )
        campaign = Campaign.where(:id => id)

        if campaign == nil
            @campaign = campaign
        else
            @campaign = campaign.first
        end

        return @campaign
    end
end
