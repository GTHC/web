class AddNotificationIdToShift < ActiveRecord::Migration[5.2]
  def change
    add_column :shifts, :notification_id, :string
  end
end
