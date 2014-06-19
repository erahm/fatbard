require 'active_support'
require 'mongoid'

class Campaign
    include Mongoid::Document

    field :name, type: String
    field :gameMaster, type: String
    field :players, type: Hash
    field :journal, type: Hash

    validates_presence_of :name
    validates_presence_of :gameMaster

end
