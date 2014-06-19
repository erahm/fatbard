require 'json'
require_relative '../../controllers/JournalEntryController.rb'
require_relative '../../controllers/CampaignController.rb'

module Fatbard
	module Routes
		module Api
			class JournalEntries < Sinatra::Application
				get '/api/journal/:campaignId' do
					content_type :json

					campaignController = CampaignController.new

					validateParams(params)
					journal = campaignController.retrieveJournal(params[:campaignId])

					if journal == nil
						haltCode = 404
						responseData = nil
					else
						haltCode = 200
						responseData = { journal: journal }.to_json
					end

					halt haltCode, responseData

				end

				get '/api/journalEntry/:entryId' do
					content_type :json

					journalEntryController = JournalEntryController.new

					validateParams(params)
					entry = journalEntryController.retrieve(params[:entryId])

					if entry == nil
						haltCode = 404
						responseData = nil
					else
						haltCode = 200
						responseData = { journalEntry: entry }.to_json
					end

					halt haltCode, responseData

				end

				post '/api/journalEntry/:username' do
					content_type :json

					journalEntryController = JournalEntryController.new

					requestData = request.POST
					validateParams(requestData)

					journalEntryController.create(requestData)

					if journalEntryController.journalEntry == nil
						halt 400
					else
						halt 201, response.headers[ 'Location' ] = "/api/journalEntry/#{journalEntryController.journalEntry._id}"
					end
				end

				protected
				def validateParams ( params )
					halt 400 if params.length == 0
				end
			end
		end
	end
end