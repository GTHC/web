class AddStartTimeToShift < ActiveRecord::Migration[5.1]
  def change
    add_column :shifts, :start_time, :timestamp
    add_column :shifts, :end_time, :timestamp
    remove_column :shifts, :time
  end
end
