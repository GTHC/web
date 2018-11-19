class Api::V1::ShiftsController < ApiController
  rescue_from ActiveRecord::RecordNotFound, :with => :record_not_found

  # GET /api/v1/shifts/:id
  # GET team shift at ID
  def show
    @id = params[:id]
    @shifts = current_user.team.shifts
    if @shifts.ids.include? @id
      render json: { status: 'SUCCESS', message: 'Shift found.', data: @shifts.find(@id) } , status: :ok
    else
      render json: { status: 'ERROR', message: 'ID not found.' }, status: :unprocessable_entity
    end
  end

  # GET /api/v1/shifts
  # GET all of team shifts
  def index
    @shifts = current_user.team.shifts
    if @shifts
      render json: { status: 'SUCCESS', message: 'Shifts found.', data: @shifts } , status: :ok
    else
      render json: { status: 'ERROR', message: 'Shifts not found.' }, status: :unprocessable_entity
    end
  end

  # POST /api/v1/shifts
  def create
    validate_params
    @shift = current_user.shifts.create!(
      note: params[:note],
      team_id: params[:team_id],
      start_time: params[:start_time],
      end_time: params[:end_time]
    )
    if @shift.save
      render json: { status: 'SUCCESS', message: 'Shift created.', data: @shift }, status: :ok
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
      render json: { status: 'SUCCESS', message: 'Shift updated.', data: shift }, status: :ok
    else
      render json: { status: 'ERROR', message: 'Shift not found' }, status: :unprocessable_entity
    end
  end

  # DELETE /api/v1/shifts/:idea
  def destroy
    shift = Shift.find(params[:id])
    shift.destroy
    if shift.destroyed?
      render json: { status: 'SUCCESS', message: 'Shift destroyed' }, status: :ok
    else
      render json: { status: 'ERROR', message: 'Shift not destroyed' }, status: :bad_request
    end
  end

  private

  def validate_params
    params.require([
        :note,
        :team_id,
        :start_time,
        :end_time
      ])
      @prime_params = {
        note: params[:note],
        team_id: params[:team_id],
        start_time: params[:start_time],
        end_time: params[:end_time]
      }
  end


  def record_not_found
    render json: { status: 'ERROR', message: 'Shift(s) not found.' }, status: :unprocessable_entity
  end
end
