class CreateShifts < ActiveRecord::Migration[5.1]
  def change
    create_table :shifts do |t|
      t.string :time
      t.text :note

      t.timestamps
    end
  end
end
