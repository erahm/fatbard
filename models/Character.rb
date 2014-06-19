require 'active_support'
require 'mongoid'

class Character
    include Mongoid::Document

    field :name, type: String
    field :player, type: String
    field :campaign, type: String, default: nil
    
end
