class Api::V1::UsersController < ApiController
  before_action :set_user
  def show
  end

  def index
  end

  def login
    validate_login_params
    @user = User.find_by_email(params[:email])
    if @user&.valid_password?(params[:password])
      sign_in @user
      render json: { status: 'SUCCESS', message: 'User Logged In', data: { user: @user } }, status: :ok
    else
      render json: { status: 'ERROR', message: 'Incorrect Email or Password' }, status: :unauthorized
    end
  end

  def logout
    sign_out current_user
    if !current_user
      render json: { status: 'SUCCESS', message: 'User Logged Out' }, status: :ok
    else
      render json: { status: 'ERROR', message: 'Error while Logging Out' }, status: :unauthorized
    end
  end

  private

    def set_user
      if params[:id]
        @user = User.find(params[:id])
      else
        @Users = User.all
      end
    end

    def validate_login_params
      params.require([:email, :password])
    end
end
