require 'spec_helper'

describe Character do
	it { should have_fields(:name, :player, :campaign) }
end
