class AddUseridsToNotification < ActiveRecord::Migration[5.2]
  def change
    add_column :notifications, :userids, :text, array: true, default: []
  end
end
