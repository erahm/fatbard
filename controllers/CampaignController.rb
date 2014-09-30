require_relative '../models/Campaign.rb'
require 'active_support'
require 'mongoid'

class CampaignController
    Mongoid::load!('./mongoid.yml')
    attr_accessor :campaign

    def retrieve ( id )
        campaign = Campaign.where(:_id => id)

        if campaign == nil
            @campaign = campaign
        else
            @campaign = campaign.first
        end

        @campaign
    end

    def retrieveJournal ( id )
        retrieve(id)

        @campaign.journal
    end
end
