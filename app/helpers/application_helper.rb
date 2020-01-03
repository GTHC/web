require 'net/http'
require 'uri'

module ApplicationHelper

    def shift_notification(shift, title: nil, content: nil, test: false, min_before: 10, send_now: false)
			# Send to all shift members
			netids = shift.users.collect(&:netid)
			# Notification time is min_before minutes before shift, if not sending now
			time = send_now ? nil : shift.start_time - min_before*60
			title = "Upcoming Shift Reminder" if title.nil?
			if content.nil?
				content = "Hey! Your tent shift in K-Ville starts in #{min_before} minutes!"
			end
			onesignal_id = create_notification(netids, recipient_type='netids',
																				 title, content, time, test)
			# Store notification record in db for each user
			userids = shift.users.collect(&:id)
			userids.each do |id|
				@user = User.find(id)
				@user.notifications.create(notification_id: onesignal_id, start_time: time, title: title, content: content)
			end
			#puts @user.notifications.pluck(:start_time, :title, :content)
			onesignal_id
		end

		# @note Helper method. Can delete if necessary but allows for additional
		# logic for post notifications.
		# Currently, post notifications send immediately to all users, meant to
		# be used for line monitor announcements.
		def post_notification(title, content, test: false)
			# Send to all members, immediately
			onesignal_id = create_notification(['All'], recipient_type='all',
																				 title, content, time=nil, test)
			#puts @user.notifications.pluck(:start_time, :title, :content)
			onesignal_id
		end

    # @note Function to create a scheduled notification for a list of users
    # by netid, which is mapped to a OneSignal device by an external ID.
		# @param [Array] recipients
    # @param [String] recipient_type, one of (netids, all, players)
		# @param [String] title of notification
		# @param [String] content of notification
    # @param [Boolean] test parameters without hitting OneSignal API.
		# @return [String] OneSignal ID of scheduled notification
		def create_notification(recipients, recipient_type, title, content, time,
														test)
			if recipient_type == 'netids'
				params = {'app_id' => 'b290fd9a-eedf-44b0-8bfd-6a37646957b6',
									'headings' => {'en' => title}, 'contents' => {'en' => content},
									'include_external_user_ids' => recipients}
			elsif recipient_type == 'all'
				params = {'app_id' => 'b290fd9a-eedf-44b0-8bfd-6a37646957b6',
									'headings' => {'en' => title}, 'contents' => {'en' => content},
									 'included_segments' => ['All']}
			elsif recipient_type == 'players'
				params = {'app_id' => 'b290fd9a-eedf-44b0-8bfd-6a37646957b6',
									'headings' => {'en' => title}, 'contents' => {'en' => content},
									'include_player_ids' => recipients}
			else # assume sending to test users
				params = {'app_id' => 'b290fd9a-eedf-44b0-8bfd-6a37646957b6',
									'headings' => {'en' => title}, 'contents' => {'en' => content},
									'included_segments' => ['Test Users']}
			end
			params['send_after'] = time if time
			puts "Params:", params
			return params.to_json if test
			uri = URI.parse('https://onesignal.com/api/v1/notifications')
			http = Net::HTTP.new(uri.host, uri.port)
			http.use_ssl = true
			request = Net::HTTP::Post.new(uri.path,	'Content-Type'  => 'application/json;charset=utf-8', 'Authorization' => 'Basic NDY3ZjU0NTktZTUwNy00ODQyLWFmNTMtN2IzYjAyZjI5MGYx')
			request.body = params.as_json.to_json
			response = http.request(request)
			data = JSON.parse(response.body)
			data.has_key?('id') ? data['id'] : nil
		end

		# @note Cancel a created notification using its OneSignal ID.
		# @param onesignal_id
		# @return True on successful deletion of notification. False otherwise.
		def cancel_notification(onesignal_id)
			params = {'app_id' => 'b290fd9a-eedf-44b0-8bfd-6a37646957b6',
								'id' => '0381a837-e811-495f-a745-88638e942572'}
			uri = URI.parse("https://onesignal.com/api/v1/notifications/#{params['id']}?app_id=#{params['app_id']}")
			request = Net::HTTP::Delete.new(uri)
			request["Authorization"] = "Basic NDY3ZjU0NTktZTUwNy00ODQyLWFmNTMtN2IzYjAyZjI5MGYx"
			req_options = {
					use_ssl: uri.scheme == "https",
			}
			response = Net::HTTP.start(uri.hostname, uri.port, req_options) do |http|
				http.request(request)
			end
			data = JSON.parse(response.body)
			result = data.has_key?('success') ? data['success'] : false
			ActiveModel::Type::Boolean.new.cast(result)
end

		# @note Helper function to clear old notification on deletion or update.
    # Wrapper method that deletes notification on both OneSignal and the db.
		# @param [String] notification_id OneSignal Notification ID.
		def destroy_notification(notification_id)
			puts "Cancelling Notification ID: #{notification_id}"
			if notification_id
				# Destroy all notification with this OneSignal ID
				Notification.where(notification_id: notification_id).destroy_all
				# Cancel the OneSignal scheduled notification
				cancel_notification(notification_id)
			end
		end

end