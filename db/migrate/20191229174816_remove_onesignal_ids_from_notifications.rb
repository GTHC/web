class RemoveOnesignalIdsFromNotifications < ActiveRecord::Migration[5.2]
  def change
    remove_column :notifications, :onesignal_ids, :text
  end
end
