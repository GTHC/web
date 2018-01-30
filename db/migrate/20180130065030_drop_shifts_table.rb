class DropShiftsTable < ActiveRecord::Migration[5.1]
  def up
   drop_table :shifts
 end

 def down
   raise ActiveRecord::IrreversibleMigration
 end
end
