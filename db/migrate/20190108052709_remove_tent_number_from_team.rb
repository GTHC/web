class RemoveTentNumberFromTeam < ActiveRecord::Migration[5.2]
  def change
    remove_column :teams, :tent_number, :integer
  end
end
