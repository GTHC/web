class RemoveDayFromAvailability < ActiveRecord::Migration[5.2]
  def change
    remove_column :availabilities, :day, :datetime
  end
end
