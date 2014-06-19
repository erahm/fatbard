ENV['RACK_ENV'] = 'test'

require 'spec_helper'
require_relative '../../models/JournalEntry.rb'

describe JournalEntryController do
    include Rack::Test::Methods

    before :each do
	@journalEntryController = JournalEntryController.new
    end
end