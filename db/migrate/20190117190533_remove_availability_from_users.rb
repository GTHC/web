class RemoveAvailabilityFromUsers < ActiveRecord::Migration[5.2]
  def change
    remove_column :users, :availability, :string
  end
end
