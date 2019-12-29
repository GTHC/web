require 'net/http'
require 'json'
require 'jsonapi-resources'

class Notification < ApplicationRecord
    belongs_to :user

		## @param [Array] netids (OneSignal External IDs)
		## @param [String] title of notification
		## @param [String] content of notification
		## @return [String] OneSignal ID of scheduled notification
    #def create_notification(netids, time, title='Title', content='Content')
    #    params = {'app_id' => 'b290fd9a-eedf-44b0-8bfd-6a37646957b6',
    #              'headings' => {'en' => title},
    #              'contents' => {'en' => content},
    #              'include_external_user_ids' => netids,
    #              # 'included_segments' => ['All'],
    #              # 'include_player_ids' => ['08751c80-ab03-4fee-9480-1089e7e5ec4b']
    #            }
		#		uri = URI.parse('https://onesignal.com/api/v1/notifications')
		#		http = Net::HTTP.new(uri.host, uri.port)
		#		http.use_ssl = true
		#		request = Net::HTTP::Post.new(uri.path,
		#    'Content-Type'  => 'application/json;charset=utf-8',
		#    'Authorization' => 'Basic NDY3ZjU0NTktZTUwNy00ODQyLWFmNTMtN2IzYjAyZjI5MGYx')
		#		request.body = params.as_json.to_json
		#		response = http.request(request)
		#		data = JSON.parse(response.body)
		#		data.has_key?('id') ? data['id'] : nil
		#	# this can be used to cancel the notification when needed
		#end
		#
		## notif
		#def test(netids, title='Title', content='Content')
		#	'ONESIGNALID'
		#end
		#
    #def cancel_notification(onesignal_id)
    #  10
    #end
end