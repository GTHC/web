class DropUsersTable < ActiveRecord::Migration[5.1]
  def up
   drop_table :users
 end

 def down
   raise ActiveRecord::IrreversibleMigration
 end
end
