require 'active_support'
require 'mongoid'

class User
    include Mongoid::Document

    field :username, type: String
    field :password, type: String
    field :firstName, type: String
    field :email, type: String
    field :salt, type: String

end
