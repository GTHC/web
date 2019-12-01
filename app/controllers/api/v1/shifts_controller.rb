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

  def format_olson(date)
    date = date.in_time_zone('America/New_York')
    start_slot = date.beginning_of_day
    team = current_user.team
    people = [] # arr of Person elements
    slotGrid = [] # arr of Slot arrays
    team.users.each do | user, index |
      slots = []
      person = GTHC::Olson.Person.new(
        user.id,
        user.name,
        0,0,0,0
      )
      # 30 min slots
      for i in 0...48
       end_slot = start_slot + 30.minutes
       status = get_status_of_slot(user, start_slot, end_slot)
       is_night = is_slot_night(start_slot)
       slot = GTHC::Olson.Slot.new(
         user.id,
         start_slot,
         end_slot,
         "Black", #TODO: Take in user input
         is_night,
         status,
         # row = i, position of slot on scheduleGrid
         # col = index, position of person on scheduleGrid
         # (check gthc/gthc for more details)
         i, index
       )
       slots.push slot
       start_slot = end_slot

       if status != "Unavailable"
         if is_night
           person.nightFree += 1
         else
           person.dayFree += 1
         end
       end
      end

      people.push person
      slotGrid.push slots
    end

    return people, slotsGrid
  end

  def get_availability_of_slot(user, start_slot, end_slot)
    start_relations = user.availabilities.where(start_time: start_slot..end_slot)

    end_relations = user.availabilities.where(end_time: start_slot..end_slot)

    start_relations.or(end_relations)
  end

  def get_status_of_slot(user, start_slot, end_slot)
    avail = get_availability_of_slot(user, start_slot, end_slot)
    if avail.length == 0
      return "Unavailable"
    elsif avail.where(somewhat: true).length > 0
      return "Somewhat"
    end
    "Available"
  end

  def is_slot_night(start_slot)
    # if slot is in between 2:00 - 6:59 AM of that day, then it is a night slot
    start_night = start_slot.change({ hour: 2, min: 0 })
    end_night = start_slot.change({ hour: 6, min: 59, sec: 59 })

    start_slot >= start_night and end_night > start_slot
  end
end
