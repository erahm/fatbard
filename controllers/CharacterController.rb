require_relative '../models/Character.rb'
require 'active_support'
require 'mongoid'

class CharacterController
        Mongoid.load!('./mongoid.yml')
        attr_accessor :character

        def retrieve ( id )
            character = Character.where(:_id => id)

            if character == nil
                @character = character
            else
                @character = character.first
            end

            return @character
        end
end
