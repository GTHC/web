ActiveAdmin.register Team do
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
  permit_params :name, :captain_id, :tent_type, :tent_number, :passcode

  index do
    column :name do |team|
      link_to team.name, admin_team_path(team)
    end
    column :captain do |team|
      link_to team.captain.user.name, admin_user_path(team.captain.user)
    end
    column :tent_type
    column :tent_number
    column :passcode
  end

end
