ActiveAdmin.register AdminUser do
  permit_params :email, :password, :password_confirmation

  # actions
  config.clear_action_items!
  action_item :edit, only: :show do
    if resource.email != current_admin_user.email
      link_to "Delete Admin User", {action: :destroy}, method: :delete, data: { confirm: 'Admin User will be deleted forever. Are you sure?' }
    else
      link_to "Edit Admin User", {action: :edit}
    end
  end

  action_item :edit, only: :index do
    link_to "New Admin User", {action: :new}
  end

  # index page
  index do
    selectable_column
    id_column
    column :email
    column :current_sign_in_at
    column :sign_in_count
    column :created_at
    column :actions do |admin|
      raw(
          %(
            #{link_to 'View', admin_admin_user_path(admin)}
            #{link_to 'Edit', edit_admin_admin_user_path(admin) unless admin != current_admin_user}
            #{(link_to 'Delete', admin_user_path(admin), method: :delete, data: { confirm: 'Admin User will be deleted forever. Are you sure?' }) unless admin == current_admin_user }
          )
      )
    end
  end

  filter :email
  filter :current_sign_in_at
  filter :sign_in_count
  filter :created_at

  form do |f|
    f.inputs do
      f.input :email
      f.input :password
      f.input :password_confirmation
    end
    f.actions
  end

end
