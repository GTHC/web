class AddEnableAnnouncementNotificationsToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :enable_announcement_notifications, :boolean, :default => true
  end
end
