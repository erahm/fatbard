ENV['RACK_ENV'] = 'test'

require 'spec_helper'

def app
    Fatbard::Main
end

describe 'main' do
    include Rack::Test::Methods

    describe '/' do
        it "should load the home page" do
            get '/'
            last_response.status.should == 200
        end
    end

end
