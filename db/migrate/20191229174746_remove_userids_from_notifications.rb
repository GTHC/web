class RemoveUseridsFromNotifications < ActiveRecord::Migration[5.2]
  def change
    remove_column :notifications, :userids, :text
  end
end
