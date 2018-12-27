class AddPasscodeToTeam < ActiveRecord::Migration[5.1]
  def change
    add_column :teams, :passcode, :string
  end
end
