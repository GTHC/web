class AddUserIdToAvailability < ActiveRecord::Migration[5.2]
  def change
    add_column :availabilities, :user_id, :integer
  end
end
