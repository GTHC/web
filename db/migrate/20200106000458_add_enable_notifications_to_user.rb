class AddEnableNotificationsToUser < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :enable_shift_notifications, :boolean, :default => true
    add_column :users, :enable_announcement_notifications, :boolean, :default => true
  end
end
