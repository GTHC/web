class AddNetidToUser < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :netid, :string
  end
end
