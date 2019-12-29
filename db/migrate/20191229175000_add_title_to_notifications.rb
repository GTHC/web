class AddTitleToNotifications < ActiveRecord::Migration[5.2]
  def change
    add_column :notifications, :title, :string
  end
end
