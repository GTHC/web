class AddShiftToNotifications < ActiveRecord::Migration[5.2]
  def change
    add_column :notifications, :shift, :bigint
  end
end
