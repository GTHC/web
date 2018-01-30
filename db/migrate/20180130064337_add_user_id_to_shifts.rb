class AddUserIdToShifts < ActiveRecord::Migration[5.1]
  def change
    add_column :shifts, :user_id, :integer
  end
end
