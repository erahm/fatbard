require_relative '../../controllers/UserController.rb'

describe 'UserController' do
    userController = UserController.new

    it "should raise exception if parameters are empty" do
        params = []
        userController.createUser(params)
        expect { some_method }.should raise_error
    end

    it "should raise exception if username is empty" do
        params = [:email => "email@email.com", :username => ""]
        userController.createUser(params)
        expect { some_method }.should raise_error
    end

end
