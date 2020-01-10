module Api::V1::UsersHelper

  def validate_shift_params
    params.require([:shift_id, :user_id])
    @s_id = params[:shift_id].to_i
    @u_id = params[:user_id].to_i
  end

  def validate_params_update
    params.require([
      :name,
      :phone,
      :enable_shift_notifications,
      :enable_announcement_notifications
    ]);
  end

  def validate_params_signup
    params.require([:name, :phone])
  end

  def validate_avatar_params
    params.require(:avatarFile)
  end

  def validate_params_update_availability
    params.require([:start, :end, :somewhat])
  end

  def validate_params_destroy_availability
    params.require([:a_id])
  end
end
