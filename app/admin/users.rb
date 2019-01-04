ActiveAdmin.register User do
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
  permit_params :email, :name, :team_id, :sign_in_count


  # defines what the index table shows
  index do
    column :name do |user|
      link_to user.name, admin_user_path(user)
    end
    column :email
    column :team do |user|
      link_to user.team.name, admin_team_path(user.team)
    end
    column :sign_in_count

    actions
  end



end
