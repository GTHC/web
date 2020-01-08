class CreateNotifications < ActiveRecord::Migration[5.2]
  def change
    create_table :notifications do |t|
      t.string :notification_id
      t.datetime :start_time
      t.string :title
      t.string :content
      t.bigint :user_id, index: true, foreign_key: true
      t.timestamps
    end
  end
end
