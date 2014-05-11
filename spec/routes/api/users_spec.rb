ENV['RACK_ENV'] = 'test'

require 'spec_helper'


def app
    Fatbard::Main
end

describe 'Users' do
    include Rack::Test::Methods

    describe '/api/user' do
        context 'if request is empty' do
            it "should return 400" do
                post '/api/user'
                last_response.status.should == 400
            end
        end
    end
end
