class AddStartTimeToNotification < ActiveRecord::Migration[5.2]
  def change
    add_column :notifications, :start_time, :datetime
  end
end
