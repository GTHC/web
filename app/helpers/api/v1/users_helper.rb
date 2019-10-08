module Api::V1::UsersHelper
  def validate_forgot_password_params
    params.require([:user_email])
  end

  def validate_login_params
    params.require([:email, :password])
  end

  def validate_params
    params.require([:name,
                    :email,
                    :phone,
                    :password,
                    :password_confirmation,
                    :team_id])
  end

  def validate_shift_params
    params.require([:shift_id, :user_id])
    @s_id = params[:shift_id].to_i
    @u_id = params[:user_id].to_i
  end

  def validate_params_update
    params.require([:name, :phone]);
  end

  def validate_reset_token_password_params
      params.require([:password, :password_confirmation, :token])
      @reset_params = {
        reset_password_token: params[:token],
        password: params[:password],
        password_confirmation: params[:password_confirmation]
      }
  end

  def validate_params_password_check
    params.require([:password])
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
