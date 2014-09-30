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

        @journalEntry
    end

    def create ( params )
        if params.empty?
            @journalEntry = nil
        else
            @journalEntry = JournalEntry.new
            params.each_pair do |key, value|
                assignValues(key, value)
            end

            save()
        end
    end

    def update ( id, params )
        if params.empty? or id.empty?
            @journalEntry = nil
        else
            retrieve(id)

            params.each_pair do |key, value|
                assignValues(key, value)
            end
        end

        save()
    end

    def delete ( id )
        retrieve(id)

        @journalEntry.delete unless @journalEntry == nil
    end

    protected
    def assignValues ( key, value )
        case key
            when "character"
                @journalEntry.character = value
            when "text"
                @journalEntry.text = value
        end
    end

    protected
    def save
        @journalEntry.save unless @journalEntry == nil
    end
end
