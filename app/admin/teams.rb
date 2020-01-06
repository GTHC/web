ActiveAdmin.register Team do
  actions :all, :except => [:new]
# See permitted parameters documentation:
# https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
#
# permit_params :list, :of, :attributes, :on, :model
#
# or
#
# permit_params do
#   permitted = [:permitted, :attributes]
#   permitted << :other if params[:action] == 'create' && current_user.admin?
#   permitted
# end
  permit_params :name, :captain_id, :tent_type, :passcode

  # defines what the index table shows
  index do
    column :name do |team|
      link_to team.name, admin_team_path(team)
    end
    column :captain do |team|
      if team.captain
        link_to team.captain.user.name, admin_user_path(team.captain.user)
      else
        "No Captain"
      end
    end
    column :tent_type
    column :passcode
  end

  # filter
  filter :name
  filter :captain_id, as: :select, collection: -> {
    Captain.all.map { |c| [c.user.name, c.id] }
  }
  filter :users
  filter :tent_type, as: :select
  filter :passcode

  # show page
  show do
    attributes_table do
      row :name
      row :captain do |t|
        if team.captain
          link_to team.captain.user.name, admin_user_path(team.captain.user)
        else
          "No Captain"
        end
      end
      row :tent_type
      row :passcode
    end
    active_admin_comments
  end

  sidebar "Captain Details", only: :show do
     attributes_table_for team.captain.user do
       row :name do |user|
         link_to user.name, admin_user_path(user)
       end
       row :email
    end
  end

end
