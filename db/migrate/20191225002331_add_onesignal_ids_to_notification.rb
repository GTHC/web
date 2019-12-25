class AddOnesignalIdsToNotification < ActiveRecord::Migration[5.2]
  def change
    add_column :notifications, :onesignal_ids, :text, array: true, default: []
  end
end
