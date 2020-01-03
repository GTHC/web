class ChangeNotificationIdToBeStringInNotifications < ActiveRecord::Migration[5.2]
  def change
    change_column :notifications, :notification_id, :string
  end
end
