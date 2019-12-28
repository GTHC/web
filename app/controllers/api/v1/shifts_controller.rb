class Api::V1::ShiftsController < ApiController
  rescue_from ActiveRecord::RecordNotFound, :with => :record_not_found

  # GET /api/v1/shifts/:id
  # GET team shift at ID
  def show
    if current_user
      @id = params[:id]
      @shifts = current_user.team.shifts
      if @shifts.ids.include? @id
        data = {
          shift: @shift.find(@id)
        }
        render json: { status: 'SUCCESS', message: 'Shift found.', data: data } , status: :ok
      else
        render json: { status: 'ERROR', message: 'ID not found.' }, status: :unprocessable_entity
      end
    else
      render json: { status: 'ERROR', message: 'User must be logged in.' }, status: :unprocessable_entity
    end
  end

  # GET /api/v1/shifts
  # GET all shifts
  def index
    if current_user
      @shifts = current_user.team.shifts
      if @shifts
        data = {
          user_shifts: format_shifts(current_user.shifts),
          team_shifts: format_shifts(@shifts),
        }
        render json: { status: 'SUCCESS', message: 'Shifts found.', data: data } , status: :ok
      else
        render json: { status: 'ERROR', message: 'Shifts not found.' }, status: :unprocessable_entity
      end
    else
      render json: { status: 'ERROR', message: 'User must be logged in.' }, status: :unprocessable_entity
    end
  end

  # POST /api/v1/shifts
  def create
    validate_params
    @shift = Shift.create!(
      title: params[:title],
      note: params[:note],
      team_id: current_user.team.id,
      start_time: params[:start_time],
      end_time: params[:end_time]
    )
    if @shift.save
      if params[:user_ids]
        params[:user_ids].each do |id|
          @user = User.find(id)
          @user.shifts << @shift
        end
      else
        current_user.shifts << @shift
      end
      data = {
          shift: format_shifts([@shift]),
          user_shifts: format_shifts(current_user.shifts),
          team_shifts: format_shifts(current_user.team.shifts),
        }
      render json: { status: 'SUCCESS', message: 'Shift created.', data: data }, status: :ok
      # Send to all shift members
      netids = @shift.users.collect(&:netid)
      # Notification time is 30 minutes before the shift
      time = @shift.start_time - 30*60
      onesignal_id = helpers.test_create_notification(netids,
                                                      title='Title',
                                                      content='Content',
                                                      time=nil) # test -> send immediately
      @shift.notification_id = onesignal_id if onesignal_id
      puts @shift.to_json
    else
      render json: { status: 'ERROR', message: 'Shift not created.', data: @shift.errors }, status: :unprocessable_entity
    end
  end

  # PUT /api/v1/shifts/:id
  # PATCH /api/v1/shifts/:id
  def update
    validate_params
    update_users = false
    if shift = Shift.find(params[:id])
      if params[:user_ids]
        update_users = true
        shift.users = []
        params[:user_ids].each do |id|
          @user = User.find(id)
          shift.users << @user
        end
      end
      shift.update(@prime_params)
      # If new start time or new users, cancel old notification and create new one
      if shift.saved_change_to_start_time? or update_users
        # Delete the notification for the current shift using its ID
        helpers.cancel_notification(shift.notification_id) if shift.notification_id
        # Create a new notification for new shift.start - 30
        netids = shift.users.collect(&:netid)
        # Notification time is 30 minutes before the shift
        time = shift.start_time - 30*60
        new_onesignal_id = helpers.test_create_notification(netids,
                                                       title='Title',
                                                       content='Content',
                                                       time=nil) # test -> send immediately
        shift.notification_id = new_onesignal_id if new_onesignal_id
        shift.save
      end
      data = {
        shift: format_shifts([shift]),
        user_shifts: format_shifts(current_user.shifts),
        team_shifts: format_shifts(current_user.team.shifts),
      }
      render json: { status: 'SUCCESS', message: 'Shift updated.', data: data }, status: :ok
    else
      render json: { status: 'ERROR', message: 'Shift not found' }, status: :unprocessable_entity
    end
  end

  # DELETE /api/v1/shifts/:id
  def destroy
    shift = Shift.find(params[:id])
    shift.destroy
    if shift.destroyed?
      data = {
        user_shifts: format_shifts(current_user.shifts),
        team_shifts: format_shifts(current_user.team.shifts),
      }
      render json: { status: 'SUCCESS', message: 'Shift destroyed', data: data }, status: :ok
    else
      render json: { status: 'ERROR', message: 'Shift not destroyed' }, status: :bad_request
    end
  end

  private

  def validate_params
    params.require([
        :title,
        :start_time,
        :end_time
      ])
      @prime_params = {
        title: params[:title],
        note: params[:note],
        start_time: params[:start_time],
        end_time: params[:end_time]
      }
  end


  def record_not_found
    render json: { status: 'ERROR', message: 'Shift(s) not found.' }, status: :not_found
  end

  def format_shifts(shifts)
    data = []
    shifts.each do |s|
      data.push({
        id: s.id,
        title: s.title,
        start: s.start_time,
        end: s.end_time,
        note: s.note,
        users: s.users,
      })
    end
    data
  end
end
