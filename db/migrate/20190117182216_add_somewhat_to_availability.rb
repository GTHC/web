class AddSomewhatToAvailability < ActiveRecord::Migration[5.2]
  def change
    add_column :availabilities, :somewhat, :boolean, default: false
  end
end
