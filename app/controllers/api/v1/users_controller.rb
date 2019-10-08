class Api::V1::UsersController < ApiController
  # before_action :set_user

  def show
    set_user
  end

  def index
    set_user
  end

  # PUT/PATCH /api/v1/user/:id
  def update
    if user = User.find(params[:id])
      user.update(helpers.validate_params_update)

      render json: { status: 'SUCCESS', message: 'User successfully updated.', data: user }, staus: :ok
    else
      render json: { status: 'ERROR', message: 'User not found' }, status: :not_found
    end
  end

  # purpose - checks if users' session is still live
  # GET /api/v1/user/session
  def timeout
    if !session[:user_id].nil?
      render json: { message: 'User logged in.', status: true }
    else
      render json: { message: 'User not logged in.', status: false }
    end
  end

  # POST /login
  def login
    helpers.validate_login_params
    @user = User.find_by_email(params[:email])
    if @user&.valid_password?(params[:password])
      @user.remember_me = true
      bypass_sign_in @user
      @team = @user.team
      if current_user
        # setting up data
        data = format_user_data({
            user: @user.as_json,
            team: @team.as_json,
            captain: @team.captain,
          })

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

  # POST /api/v1/user/token_reset_password
  # Change user password using reset token
  def token_reset_password
    helpers.validate_reset_token_password_params

    @user = User.reset_password_by_token(@reset_params)

    if @user.errors.empty?
        render json: { status: 'SUCCESS', message: 'Password has xpbeen reset.', email: params[:user_email]}, status: :ok
    else
      render json: { status: 'ERROR', data: @user.errors, message: 'Server error prevented password from being reset.' }, status: :not_found
    end
  end

  # POST /api/v1/user/forgot_password
  # Initiate password reset process
  def forgot_password
    helpers.validate_forgot_password_params

    # Check if valid email that is registered to an GTHC account
    @user = User.find_by_email(params[:user_email]);
    if @user
      @output = edit_password_url(@user, reset_password_token: '123')
      @user.send_reset_password_instructions

      if @user.errors.empty?
        render json: { status: 'SUCCESS', message: 'Password reset sent.', email: params[:user_email]}, status: :ok
      else
        render json: { status: 'ERROR', message: 'Server error prevented email from being sent.' }, status: :not_found
      end
    else
      render json: { status: 'ERROR', message: 'There is no user associated with that email.' }, status: :not_found
    end
  end

  # POST /api/v1/user/shifts
  # Add user to shift, and vice versa
  def shifts
    helpers.validate_shift_params
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

  # PUT /api/v1/user/password/check
  # purpose - checks users password on the user setting page
  def password_check
    helpers.validate_params_password_check
    if current_user.valid_password? params[:password]
      render json: { message: 'Correct Password', check: true }, status: :ok
    else
      render json: { message: 'Incorrect Password', check: false }, status: :ok
    end
  end

  # POST /api/v1/user/avatar
  def update_avatar
    helpers.validate_avatar_params
    current_user.avatar.attach(params[:avatarFile])
    if current_user.avatar.attached?
      render json: { status: 'SUCCESS', message: 'User avatar updated successfully', data: url_for(current_user.avatar) }, status: :ok
    else
      render json: { status: 'ERROR', message: 'User avatar not updated.' }, status: :unprocessable_entity
    end
  end

  # availability

  # POST /api/v1/user/availability
  def create_availability
    if current_user
      helpers.validate_params_update_availability
      @start = params[:start]
      @end = params[:end]
      @somewhat = params[:somewhat]
      begin
        check_avail_overlap
        render json: { status: 'SUCCESS', message: 'Availability has been created.', data: current_user.availabilities }, status: :ok
      rescue Exception
        render json: { status: 'ERROR', message: 'Creating new availability has failed. Check logs.' }, status: :unprocessable_entity
      end
    else
      render json: { status: 'ERROR', message: 'User needs to be logged in.' }, status: :unprocessable_entity
    end
  end

  # PUT /api/v1/user/availability/:a_id
  def update_availability
    if current_user
      helpers.validate_params_update_availability
      if current_user.availabilities.exists?(params[:a_id])
        availability = current_user.availabilities.find(params[:a_id])
        availability.update({
          start: params[:start],
          end: params[:end],
          somewhat: params[:somewhat],
        })
        render json: { status: 'SUCCESS', message: 'Availability updated.', data: current_user.availabilities }, status: :ok
      else
        render json: { status: 'ERROR', message: 'Availability not found.' }, status: :not_found
      end
    else
      render json: { status: 'ERROR', message: 'User needs to be logged in.' }, status: :unprocessable_entity
    end
  end

  # DELETE /api/v1/user/availability/:a_id
  def destroy_availability
    helpers.validate_params_destroy_availability
    if current_user

      if current_user.availabilities.exists? id: params[:a_id]
        avail = current_user.availabilities.find(params[:a_id])
        if avail.destroy
          render json: { status: 'SUCCESS', message: 'Availability has been removed successfully', data: current_user.availabilities }, status: :ok

        else
          render json: { status: 'ERROR', message: 'Unable to remove availability record.' }, status: :unprocessable_entity
        end
      else
        render json: { status: 'ERROR', message: 'Unable to find availability with such id. Check the id being sent.' }, status: :not_found
      end
    else
      render json: { status: 'ERROR', message: 'User needs to be logged in.' }, status: :unprocessable_entity
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

    # check_avail_overlap - it is meant to eventually create an
    # availability record, but checks for overlaps before it does
    def check_avail_overlap
      avails = current_user.availabilities.where(somewhat: @somewhat)

      # checks if start or end time of another availability is on top of the incoming availability
      start_overlap = avails.where(start: @start..@end)
      end_overlap = avails.where(end: @start..@end)

      # checks if incoming avail is on within of another avail
      # therefore it would not be needed
      inter_overlap = avails.where('start <= ?', @start).where('availabilities.end >= ?', @end)

      if inter_overlap.count > 0
        # if there are similar availabilities that already exist,
        # then there is no need to add another

        return
      elsif start_overlap.count > 0 || end_overlap.count > 0
        # any slight overlap from other availabilities go here

        # sets avail to be any start_overlap by default, but
        # it will change to end_overlap if start is empty
        avail = start_overlap.first
        avail = end_overlap.first if start_overlap.first.nil?

        avail.start = @start if avail.start > @start
        avail.end = @end if avail.end < @end
        avail.save
      else
        # unique availabilities go here (there are no overlaps)

        avails.create!(
          start: @start,
          end: @end,
          somewhat: @somewhat,
        )
      end
    end
end
