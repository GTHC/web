class CreateCaptains < ActiveRecord::Migration[5.1]
  def change
    create_table :captains do |t|
      t.integer :user_id

      t.timestamps
    end
  end
end
