require 'active_support'
require 'mongoid'

class User
    include Mongoid::Document

    field :username, type: String
    field :password, type: String
    field :firstName, type: String
    field :email, type: String
    field :salt, type: String

    validates_presence_of :username
    validates_presence_of :email
    validates_presence_of :password
    validates_uniqueness_of :username, :case_sensitive => false

end
