ENV['RACK_ENV'] = 'test'

require 'spec_helper'
require 'json'


def app
    Fatbard::Main
end

describe 'Users' do
    include Rack::Test::Methods

    before :each do
        DatabaseCleaner[:mongoid].start
    end

    after :each do
        DatabaseCleaner[:mongoid].clean
    end

    describe '#POST' do
        describe '/api/user' do
            context 'if request is empty' do
                it "should return 400" do
                    post '/api/user'
                    last_response.status.should == 400
                end
            end

            context 'if request is formatted properly' do
                it 'should return 201' do
                    post '/api/user', {
                        username: 'username',
                        email: 'email@email.com',
                        firstName: 'first name',
                        password: 'i like chicken'
                    }

                    last_response.status.should == 201
                end

                it 'should return location header of user object' do
                    post '/api/user', {
                        username: 'othername',
                        email: 'email@email.com',
                        firstName: 'first name',
                        password: 'i like chicken'
                    }

                    last_response.headers['Location'].should == "/api/user/othername"
                end
            end
        end
    end

    describe '#PATCH' do
        describe '/api/user/:username' do
            context 'if user does not exsist' do
                it 'should return 404' do
                    fakeUsername = 'username'
                    User.stub(:where).with(username: fakeUsername).and_return(nil)

                    patch "/api/user/#{fakeUsername}", {
                        email: 'email@email.com',
                        firstName: 'first name',
                        password: 'i like chicken'
                    }

                    last_response.status.should == 404
                end
            end

            context 'if user does exsist' do
                it 'should return 200' do
                    fakeUser = User.new(
                        username: 'username',
                        firstName: 'first name',
                        password: 'password',
                        email: 'email@email.com'
                    )
                    User.stub(:where).with(username: fakeUser.username).and_return([fakeUser])

                    patch "/api/user/#{fakeUser.username}", {
                        firstName: 'name'
                    }

                    last_response.status.should == 200
                end

                it 'should return filtered user' do
                    fakeUser = User.new(
                        username: 'erich',
                        firstName: 'first name',
                        password: 'password',
                        email: 'email@email.com'
                    )

                    expected = {user: {
                        _id: fakeUser._id,
                        username: fakeUser.username,
                        email: fakeUser.email,
                        firstName: 'name'
                    }}.to_json
                    User.stub(:where).with(username: fakeUser.username).and_return([fakeUser])

                    patch "/api/user/#{fakeUser.username}", {
                        firstName: 'name'
                    }

                    last_response.body.should == expected
                end
            end
        end
    end

    describe '#GET' do
        describe '/api/user/:username' do
            context 'if user does not exist' do
                it 'should return 404' do
                    fakeUsername = 'username'
                    User.stub(:where).with(username: fakeUsername).and_return(nil)

                    get "/api/user/#{fakeUsername}"

                    last_response.status.should == 404
                end
            end

            context 'if user does exist' do
                it 'should return 200' do
                    fakeUser = User.new(
                        username: 'username',
                        firstName: 'first name',
                        password: 'password',
                        email: 'email@email.com'
                    )
                    User.stub(:where).with(username: fakeUser.username).and_return([fakeUser])

                    get "/api/user/#{fakeUser.username}"

                    last_response.status.should == 200
                end
            end
        end
    end

    describe '#DELETE' do
        describe '/api/user/:username' do
            context 'if user does not exist' do
                it 'should return 404' do
                    fakeUsername = 'username'
                    User.stub(:where).with(username: fakeUsername).and_return(nil)

                    delete "/api/user/#{fakeUsername}"

                    last_response.status.should == 404
                end
            end

            context 'if user does exist' do
                it 'should return 204' do
                    #This test doesn't fail when User.where returns nil. Needs fixed - erahm - 27 may 2014
                    fakeUser = User.new(
                        username: 'username',
                        firstName: 'first name',
                        password: 'password',
                        email: 'email@email.com'
                    )
                    User.stub(:where).with(username: fakeUser.username).and_return([fakeUser])

                    delete "/api/user#{fakeUser.username}"

                    last_response.status.should
                end
            end
        end
    end
end
