require 'spec_helper'

describe JournalEntry do
    it { should have_fields(:character, :text) }
    it { should validate_presence_of(:character) }
    it { should validate_presence_of(:text) }
end
