require 'net/http'
require 'jsonapi-resources'

class Notification < ApplicationRecord
	def test
		puts 'Hey'
	end

	def send_notification(s)
		params = {"app_id" => "b290fd9a-eedf-44b0-8bfd-6a37646957b6", 
		          "contents" => {"en" => s},
		          "included_segments" => ["All"]}
		uri = URI.parse('https://onesignal.com/api/v1/notifications')
		http = Net::HTTP.new(uri.host, uri.port)
		http.use_ssl = true
		request = Net::HTTP::Post.new(uri.path,
		                              'Content-Type'  => 'application/json;charset=utf-8',
		                              'Authorization' => "Basic NDY3ZjU0NTktZTUwNy00ODQyLWFmNTMtN2IzYjAyZjI5MGYx")
		request.body = params.as_json.to_json
		response = http.request(request)
		puts response.body
	end 

end
