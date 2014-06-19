require 'active_support'
require 'mongoid'

class JournalEntry
    include Mongoid::Document

    field :character, type: String
    field :text, type: String

    validates_presence_of :character
    validates_presence_of :text
    
end
