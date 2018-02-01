class AddTentTypeToTeams < ActiveRecord::Migration[5.1]
  def change
    add_column :teams, :tent_type, :string
    remove_column :teams, :type
  end
end
