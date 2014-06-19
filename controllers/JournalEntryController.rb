require_relative '../models/JournalEntry.rb'
require 'active_support'
require 'mongoid'

class JournalEntryController
    Mongoid.load!('./mongoid.yml')
    attr_accessor :journalEntry

    def retrieve ( id )
        journalEntry = JournalEntry.where(:_id => id)

        if journalEntry == nil
            @journalEntry = journalEntry
        else
            @journalEntry = journalEntry.first
        end

        return @journalEntry
    end
end
