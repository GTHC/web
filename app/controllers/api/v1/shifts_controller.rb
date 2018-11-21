class Api::V1::ShiftsController < ApiController
  rescue_from ActiveRecord::RecordNotFound, :with => :record_not_found

  # GET /api/v1/shifts/:id
  # GET team shift at ID
  def show
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
  end

  # GET /api/v1/shifts
  # GET all shifts
  def index
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
  end

  # POST /api/v1/shifts
  def create
    validate_params
    @shift = current_user.shifts.create!(
      title: params[:title],
      note: params[:note],
      team_id: current_user.team.id,
      start_time: params[:start_time],
      end_time: params[:end_time]
    )
    if @shift.save
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
        :note,
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
