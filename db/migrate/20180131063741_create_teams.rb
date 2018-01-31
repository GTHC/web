class CreateTeams < ActiveRecord::Migration[5.1]
  def change
    create_table :teams do |t|
      t.string :name
      t.string :type
      t.integer :captain_id
      t.integer :tent_number

      t.timestamps
    end
  end
end
