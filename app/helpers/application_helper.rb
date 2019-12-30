module ApplicationHelper

		# Called with helpers.test
    def test
			puts "Test"
    end

    def shift_notification(shift, title=nil, content=nil, test=false, min_before=30,
													 send_now=false)
			# Send to all shift members
			netids = shift.users.collect(&:netid)
			# Notification time is min_before minutes before shift, if not sending now
			time = send_now ? nil : shift.start_time - min_before*60
			title = "Upcoming Shift Reminder" if title.nil?
			if content.nil?
				content = "Hey! Your tent shift in K-Ville starts in #{min_before} minutes!"
			end
			if test
				onesignal_id = test_create_notification(netids, title, content, time)
			else
				onesignal_id = create_notification(netids, title, content, time)
			end
			onesignal_id
		end

    # @note Function to create a scheduled notification for a list of users
    # by netid, which is mapped to a OneSignal device by an external ID.
		# @param [Array] netids (OneSignal External IDs)
		# @param [String] title of notification
		# @param [String] content of notification
		# @return [String] OneSignal ID of scheduled notification
		def create_notification(netids, title, content time=nil)
			params = {'app_id' => 'b290fd9a-eedf-44b0-8bfd-6a37646957b6',
								'headings' => {'en' => title},
								'contents' => {'en' => content},
								'include_external_user_ids' => netids,
								# 'included_segments' => ['All'],
								# 'include_player_ids' => ['08751c80-ab03-4fee-9480-1089e7e5ec4b']
			}
			params['send_after'] = time if time
			puts "Params:", params
			uri = URI.parse('https://onesignal.com/api/v1/notifications')
			http = Net::HTTP.new(uri.host, uri.port)
			http.use_ssl = true
			request = Net::HTTP::Post.new(uri.path,
																		'Content-Type'  => 'application/json;charset=utf-8',
																		'Authorization' => 'Basic NDY3ZjU0NTktZTUwNy00ODQyLWFmNTMtN2IzYjAyZjI5MGYx')
			request.body = params.as_json.to_json
			response = http.request(request)
			data = JSON.parse(response.body)
			data.has_key?('id') ? data['id'] : nil
		end

    # @note Test notification parameters without hitting OneSignal API.
		def test_create_notification(netids, title='Title', content='Content', time=nil,  print_params=false)
			params = {'app_id' => 'b290fd9a-eedf-44b0-8bfd-6a37646957b6',
								'headings' => {'en' => title},
								'contents' => {'en' => content},
								'include_external_user_ids' => netids
			}
			params['send_after'] = time if time
			puts "Params:", params if print_params
			"{Notification time: #{time}, title: #{title}, content: #{content},
			 netids: #{netids.join(', ')}}"
		end

		# @note Cancel a created notification using its OneSignal ID.
    # @param onesignal_id
    # @return True on successful deletion of notification. False otherwise.
		def cancel_notification(onesignal_id)
			# https://onesignal.com/api/v1/notifications/:id?app_id=:app_id
			params = {'app_id' => 'b290fd9a-eedf-44b0-8bfd-6a37646957b6',
								'id' => onesignal_id}
			uri = URI.parse('https://onesignal.com/api/v1/notifications')
			http = Net::HTTP.new(uri.host, uri.port)
			http.use_ssl = true
			request = Net::HTTP::Delete.new(uri.path,
																		'Content-Type'  => 'application/json;charset=utf-8',
																		'Authorization' => 'Basic NDY3ZjU0NTktZTUwNy00ODQyLWFmNTMtN2IzYjAyZjI5MGYx')
			request.body = params.as_json.to_json
			response = http.request(request)
			data = JSON.parse(response.body)
			result = data.has_key?('success') ? data['success'] : false
			ActiveModel::Type::Boolean.new.cast(result)
		end

		# @note Clear old notification on deletion or update.
    # Wrapper method that deletes notification on both OneSignal and the db.
		# @param [String] notification_id OneSignal Notification ID.
		def destroy_notification(notification_id)
			puts "Clearing Notification ID: #{notification_id}"
			if notification_id
				# Destroy all notification with this OneSignal ID
				Notification.destroy_by(notification_id: notification_id)
				# Cancel the OneSignal scheduled notification
				cancel_notification(notification_id)
			end
		end

end