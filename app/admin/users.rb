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

  # index page
  # defines what the index table shows
  index do
    column :name do |user|
      link_to user.name, admin_user_path(user)
    end
    column :email
    column :team do |user|
      if user.team
        link_to user.team.name, admin_team_path(user.team)
      else
        "No Team"
      end
    end
    column :sign_in_count

    actions
  end

  # filters on index
  filter :name
  filter :email
  filter :team

  # show page
  show do
    attributes_table do
      row :name
      row :email
      row :team_id do |user|
        link_to user.team.name, admin_team_path(user.team)
      end
      row :sign_in_count
    end
    active_admin_comments
  end
  sidebar "Team Details", only: :show do
     attributes_table_for user.team do
      row :name
      row :captain do |t|
        link_to t.captain.user.name, admin_user_path(t.captain.user)
      end
      row :tent_type
      row :passcode
    end
  end

end
