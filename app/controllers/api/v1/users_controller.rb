class Api::V1::UsersController < ApiController
  # before_action :set_user

  def show
    set_user
  end

  def index
    set_user
  end

  # PUT/PATCH /api/v1/users/:id
  def update
    if user = User.find(params[:id])
      helpers.validate_params_update
      name = params[:name]
      phone = params[:phone]
      user.update({ name: name, phone: phone })

      render json: { status: 'SUCCESS', message: 'User successfully updated.', data: user }, staus: :ok
    else
      render json: { status: 'ERROR', message: 'User not found' }, status: :not_found
    end
  end

  # PUT /api/v1/users/signup/:id
  def signup
    if user = User.find(params[:id])
      helpers.validate_params_update
      # user details
      user.name = params[:name]
      user.phone = params[:phone]
      # user's team
      if params[:type] == "create"
        captain = Captain.create!(user_id: user.id)
        teamData = params[:teamData]
        team = Team.create!(
          name: teamData[:name],
          tent_type: teamData[:tentType],
          passcode: teamData[:passcode],
          captain_id: captain.id,
        )
        user.team_id = team.id
      elsif params[:type] == "join"
        user.team_id = params[:teamData][:teamID]
      end
      # user's availabilities
      params[:availabilities].each do |a|
        user.availabilities.create!({
          start: a[:start],
          end: a[:end],
          somewhat: a[:somewhat]
        })
      end
      if !user.save
        render json: { status: 'ERROR', message: 'User data unable to be saved', data: @user.errors }, status: :unprocessable_entity
      else
        # setting up data
        team = user.team
        data = format_user_data({
            user: user.as_json,
            team: team.as_json,
            captain: team.captain,
          })

        render json: { status: 'SUCCESS', message: 'User signed up successfully!', data: data }, status: :ok
      end
    else
      render json: { status: 'ERROR', message: 'User not found' }, status: :not_found
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
