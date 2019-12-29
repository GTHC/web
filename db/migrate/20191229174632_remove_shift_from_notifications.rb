class RemoveShiftFromNotifications < ActiveRecord::Migration[5.2]
  def change
    remove_column :notifications, :shift, :bigint
  end
end
