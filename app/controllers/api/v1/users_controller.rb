class Api::V1::UsersController < ApiController
  rescue_from ActionController::ParameterMissing, :with => :param_missing

  before_action :set_user

  def show
  end

  def index
  end

  # purpose - checks if users' session is still live
  # GET /api/v1/user/session
  def timeout
    if current_user
      render json: { message: 'User logged in.', status: true }
    else
      render json: { message: 'User not logged in.', status: false }
    end
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
      phone: params[:phone],
      password: params[:password],
      password_confirmation: params[:password_confirmation],
      team_id: params[:team_id],
    )
    if params[:availability]
      @user.availability = params[:availability]
    end
    @team = @user.team
    if @user.save
      bypass_sign_in @user
      # Change availability from Strings to Integers
      @user.availability.map! {|arr| arr.map.map(&:to_i) }
      render json: { status: 'SUCCESS', message: 'User saved and signed in', data: {
        user: @user,
        team: @team,
        captain: @team.captain
        } }, status: :ok
    else
      render json: { status: 'ERROR', message: 'User not saved', data: @user.errors }, status: :unprocessable_entity
    end
  end

  # POST /login
  def login
    validate_login_params
    @user = User.find_by_email(params[:email])
    if @user&.valid_password?(params[:password])
      @user.remember_me = true
      bypass_sign_in @user
      @team = @user.team
      if current_user
        # Change availability from Strings to Integers
        @user.availability.map! {|arr| arr.map.map(&:to_i) }

        # setting up data
        data = {
            user: @user.as_json,
            team: @team.as_json,
            captain: @team.captain,
          }

        # Processing data object as it is not an ActiveRecord
        # add avatarURL if avatar
        data[:user][:avatarURL] = url_for(@user.avatar) if @user.avatar.attached?

        # add avatarURL to users in a team
        data[:team][:users] = @team.users.as_json
        data[:team][:users].each do |u|
          user = User.find(u["id"])
          u[:avatarURL] = url_for(user.avatar) if user.avatar.attached?
        end

        render json: { status: 'SUCCESS', message: 'User Logged In', data: data  }, status: :ok
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

  # PUT/PATCH /api/v1/user/:id
  def update
    if params[:password]
      validate_params_update_with_password
    else
      validate_params_update
    end
    if user = User.find(params[:id])
      user.update(@prime_params)

      # this is needed because Devise signs out a user if update() is called
      if params[:password]
        bypass_sign_in user
      end
      render json: { status: 'SUCCESS', message: 'User successfully updated.', data: user }, staus: :ok
    else
      render json: { status: 'ERROR', message: 'User not found' }, status: :not_found
    end
  end

  # PUT /api/v1/user/password/check
  # purpose - checks users password on the user setting page
  def password_check
    validate_params_password_check
    if current_user.valid_password? params[:password]
      render json: { message: 'Correct Password', check: true }, status: :ok
    else
      render json: { message: 'Incorrect Password', check: false }, status: :ok
    end
  end

  # POST /api/v1/user/availability
  def update_availability
    validate_availability
    @user = current_user
    @user.availability = params[:availability]
    if @user.save
      # Change availability from Strings to Integers
      @user.availability.map! {|arr| arr.map.map(&:to_i) }
      render json: { status: 'SUCCESS', message: 'User availability updated successfully.', data: @user.availability }, status: :ok
    else
      render json: { status: 'ERROR', message: 'User availability not able to update.' }, status: :unprocessable_entity
    end
  end

  # POST /api/v1/user/avatar
  def update_avatar
    validate_avatar_params
    current_user.avatar.attach(params[:avatarFile])
    if current_user.avatar.attached?
      render json: { status: 'SUCCESS', message: 'User avatar updated successfully', data: url_for(current_user.avatar) }, status: :ok
    else
      render json: { status: 'ERROR', message: 'User avatar not updated.' }, status: :unprocessable_entity
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
      @prime_params = {
        name: params[:name],
        phone: params[:phone],
      }
    end

    def validate_params_update_with_password
        params.require([:password, :password_confirmation])
        @prime_params = {
          password: params[:password],
          password_confirmation: params[:password_confirmation]
        }
    end

    def validate_params_password_check
      params.require([:password])
    end

    def validate_availability
      params.require([:availability])
    end

    def validate_avatar_params
      params.require(:avatarFile)
    end

    def param_missing(exception)
      render json: { status: 'ERROR', message: exception }, status: :unprocessable_entity
    end
end
