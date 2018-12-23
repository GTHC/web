class Api::V1::TeamsController < ApiController
  rescue_from ActionController::ParameterMissing, :with => :param_missing

  before_action :set_user
  def show
  end

  def index
  end

  def create
    validate_params
    @team = Team.create!(
      name: @name,
      captain_id: @captain_id,
      tent_number: @tent_number,
      tent_type: @tent_type,
      passcode: @passcode,
    )
    if @team.save
      render json: { status: 'SUCCESS', message: 'Team saved', data: @team }, status: :ok
    else
      render json: { status: 'ERROR', message: 'Team not saved', data: @team.errors }, status: :unprocessable_entity
    end
  end

 # PUT/PATCH /api/v1/team/:id
  def update
    validate_update_params
    if @team = Team.find(params[:id])
      @team.update(@prime_params)
      render json: { status: 'SUCCESS', message: 'Team updated', data: @team }, status: :ok
    else
      render json: { status: 'ERROR', message: 'Team not found' }, status: :not_found
    end
  end

  private

    def set_user
      if params[:id]
        @team = Team.find(params[:id])
      else
        @Teams = Team.all
      end
    end

    def validate_params
      params.require([:name, :captain_id, :tent_type, :passcode])
      @name = params[:name]
      @captain_id = params[:captain_id]
      @tent_number = params[:tent_number]
      @tent_type = params[:tent_type]
      @passcode = params[:passcode]
    end

    def validate_update_params
      params.require([:id, :name, :tent_type, :tent_number])
      @prime_params = {
        id: params[:id],
        name: params[:name],
        tent_number: params[:tent_number],
        tent_type: params[:tent_type],
      }
    end

    def param_missing(exception)
      render json: { status: 'ERROR', message: exception }, status: :unprocessable_entity
    end
end
