class CreateAvailabilities < ActiveRecord::Migration[5.2]
  def change
    create_table :availabilities do |t|
      t.datetime :day
      t.datetime :start
      t.datetime :end

      t.timestamps
    end
  end
end
