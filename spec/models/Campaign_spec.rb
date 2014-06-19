require 'spec_helper'

describe Campaign do
    it { should have_fields(:name, :gameMaster, :players, :journal) }
    it { should validate_presence_of(:name) }
    it { should validate_presence_of(:gameMaster) }
end
