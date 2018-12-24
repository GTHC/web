class AddAvailabilityToUser < ActiveRecord::Migration[5.1]
  def change
    default_val = Array.new(7, Array.new(20, 0))
    add_column :users, :availability, :string, array: true, default: default_val
  end
end
