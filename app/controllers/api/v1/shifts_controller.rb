class Api::V1::ShiftsController < ApiController
  before_action :set_user

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
end
