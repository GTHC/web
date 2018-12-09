class CreateUserShifts < ActiveRecord::Migration[5.1]
  def change
    create_table :user_shifts do |t|
      t.references :user, foreign_key: true
      t.references :shift, foreign_key: true

      t.timestamps
    end
  end
end
