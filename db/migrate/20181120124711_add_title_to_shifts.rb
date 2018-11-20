class AddTitleToShifts < ActiveRecord::Migration[5.1]
  def change
    add_column :shifts, :title, :string
  end
end
