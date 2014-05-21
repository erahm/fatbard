require 'spec_helper'

describe User do
    it { should have_fields(:username, :email, :password, :firstName, :salt) }
    it { should validate_presence_of(:username) }
    it { should validate_presence_of(:email) }
    it { should validate_presence_of(:password) }
    it { should validate_uniqueness_of(:username) }
end
