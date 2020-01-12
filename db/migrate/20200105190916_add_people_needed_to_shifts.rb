class AddPeopleNeededToShifts < ActiveRecord::Migration[5.2]
  def change
    add_column :shifts, :people_needed, :integer
  end
end
