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
      # Shift notification
      onesignal_id = helpers.shift_notification(@shift)
      @shift.notification_id = onesignal_id
      @shift.save
      puts @shift.to_json
    else
      render json: { status: 'ERROR', message: 'Shift not created.', data: @shift.errors }, status: :unprocessable_entity
    end
  end

  # PUT /api/v1/shifts/:id
  # PATCH /api/v1/shifts/:id
  def update
    validate_params
    if shift = Shift.find(params[:id])
      if params[:user_ids]
        shift.users = [];
        params[:user_ids].each do |id|
          @user = User.find(id)
          shift.users << @user
        end
      end
      shift.update(@prime_params)
      data = {
        shift: format_shifts([shift]),
        user_shifts: format_shifts(current_user.shifts),
        team_shifts: format_shifts(current_user.team.shifts),
      }
      helpers.destroy_notification(shift.notification_id)
      new_onesignal_id = helpers.shift_notification(shift)
      shift.notification_id = new_onesignal_id
      shift.save
      render json: { status: 'SUCCESS', message: 'Shift updated.', data: data }, status: :ok
    else
      render json: { status: 'ERROR', message: 'Shift not found' }, status: :unprocessable_entity
    end
  end

  # DELETE /api/v1/shifts/:id
  def destroy
    shift = Shift.find(params[:id])
    helpers.destroy_notification(shift.notification_id)
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

  def olson
    helpers.validate_olson_params
    people, slotGrid = helpers.format_olson(params[:date], params[:phase], params[:clear], current_user)
    _, olson_slots = GTHC::Olson.driver(people, slotGrid)
    olson_slots.each do |slot|
      if slot[:ids].length > 0
        # create shift based on olson slots with people assigned
        shift = Shift.create!(
          title: 'GTHC Generated Shift',
          note: 'Feel free to edit any of the shift data by clicking the update button.',
          start_time: slot[:startDate],
          end_time: slot[:endDate],
          team_id: current_user.team.id
        )
        # add shifts to user record
        slot[:ids].each do |id|
          User.find(id).shifts << shift
        end
      end
    end
    render json: {
      data: olson_slots,
    }
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
