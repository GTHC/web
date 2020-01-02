module ApplicationHelper

		# Called with helpers.test
    def test
			puts "Test"
    end

    def shift_notification(shift, title: nil, content: nil, test: false, min_before: 30, send_now: false)
			# Send to all shift members
			netids = shift.users.collect(&:netid)
			# Notification time is min_before minutes before shift, if not sending now
			time = send_now ? nil : shift.start_time - min_before*60
			title = "Upcoming Shift Reminder" if title.nil?
			if content.nil?
				content = "Hey! Your tent shift in K-Ville starts in #{min_before} minutes!"
			end
			onesignal_id = create_notification(netids, recipient_type = 'netids',
																				 title, content, time, test)
			# Store notification record in db for each user
			userids = shift.users.collect(&:id)
			userids.each do |id|
				@user = User.find(id)
				@user.notifications.create(start_time: time, title: title, content: content, notification_id: onesignal_id)
			end
			#puts @user.notifications.pluck(:start_time, :title, :content)
			onesignal_id
		end

		def post_notification(title, content, test: false)
			# Send to all members
			onesignal_id = create_notification(['All'], recipient_type = 'all',
																				 title, content, time, test)
			#puts @user.notifications.pluck(:start_time, :title, :content)
			onesignal_id
		end

    # @note Function to create a scheduled notification for a list of users
    # by netid, which is mapped to a OneSignal device by an external ID.
		# @param [Array] recipients
    # @param [String] recipient_type, one of (netids, all, players)
		# @param [String] title of notification
		# @param [String] content of notification
		# @return [String] OneSignal ID of scheduled notification
		def create_notification(recipients, recipient_type, title, content, time,
														test: false)
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

    # @note Test notification parameters without hitting OneSignal API.
		def test_create_notification(recipients, recipient_type, title: 'Title', content: 'Content', time: nil,  print_params: false)
			params = {'app_id' => 'b290fd9a-eedf-44b0-8bfd-6a37646957b6',
								'headings' => {'en' => title},
								'contents' => {'en' => content},
								'include_external_user_ids' => recipients
			}
			params['send_after'] = time if time
			puts "Params:", params if print_params
			"{Notification time: #{time}, title: #{title}, recipient_type: #{recipient_type}, content: #{content},
			 netids: #{recipients.join(', ')}}"
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
			request = Net::HTTP::Delete.new(uri.path, 'Content-Type'  => 'application/json;charset=utf-8', 'Authorization' => 'Basic NDY3ZjU0NTktZTUwNy00ODQyLWFmNTMtN2IzYjAyZjI5MGYx')
			request.body = params.as_json.to_json
			response = http.request(request)
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