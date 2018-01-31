class AddTeamIdToShift < ActiveRecord::Migration[5.1]
  def change
    add_column :shifts, :team_id, :integer
  end
end
