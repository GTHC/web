class Api::V1::UsersController < ApiController
  before_action :set_user

  def show
  end

  def index
  end

  # POST /api/v1/users
  def create
    validate_params
    if User.find_by_email(params[:email])
      return render json: { status: 'ERROR', message: 'User already created' }, status: :unprocessable_entity
    end
    @user = User.create!(
      name: params[:name],
      email: params[:email],
      password: params[:password],
      password_confirmation: params[:password_confirmation],
      team_id: params[:team_id],
    )
    @team = @user.team
    if @user.save
      bypass_sign_in @user
      render json: { status: 'SUCCESS', message: 'User saved and signed in', data: {
        user: @user,
        team: @team,
        captain: @team.captain
        } }, status: :ok
    else
      render json: { status: 'ERROR', message: 'User not saved', data: @user.errors }, status: :unprocessable_entity
    end
  end

  # PATCH /api/v1/users
  # TODO: Complete endpoint
  def update
    validate_params

  end

  # POST /login
  def login
    validate_login_params
    @user = User.find_by_email(params[:email])
    if @user&.valid_password?(params[:password])
      bypass_sign_in @user
      @team = @user.team
      if current_user
        render json: { status: 'SUCCESS', message: 'User Logged In', data: {
          user: @user,
          team: @team,
          captain: @team.captain,
          } }, status: :ok
      else
        render json: { status: 'ERROR', message: 'Error while Logging In' }, status: :unauthorized
      end
    else
      render json: { status: 'ERROR', message: 'Incorrect Email or Password' }, status: :unauthorized
    end
  end

  # POST /logout
  def logout
    sign_out current_user
    if !current_user
      render json: { status: 'SUCCESS', message: 'User Logged Out' }, status: :ok
    else
      render json: { status: 'ERROR', message: 'Error while Logging Out' }, status: :unauthorized
    end
  end

  # POST /api/v1/user/shifts
  # Add user to shift, and vice versa
  def shifts
    validate_shift_params
    puts @s_id
    if Shift.all.ids.include? @s_id and User.all.ids.include? @u_id
      @user = User.find(@u_id)
      @shift = Shift.find(@s_id)
      if @shift.team_id == @user.team_id
        @user.shifts <<  @shift
        data = {
          user_shifts: current_user.shifts,
          team_shifts: current_user.team.shifts,
        }
        render json: { status: 'SUCCESS', message: 'User added to Shift successfully.', data: data }, status: :ok
      else
        render json: { status: 'ERROR', message: 'Shift and User must be the same team.' }, status: :unprocessable_entity
      end
    else
      render json: { status: 'ERROR', message: 'Shift and/or User not found.' }, status: :not_found
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

    def validate_params
      params.require([:name,
                      :email,
                      :password,
                      :password_confirmation,
                      :team_id])
    end

    def validate_shift_params
      params.require([:shift_id, :user_id])
      @s_id = params[:shift_id].to_i
      @u_id = params[:user_id].to_i
    end
end
