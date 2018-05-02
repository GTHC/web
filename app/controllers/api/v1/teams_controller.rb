class Api::V1::TeamsController < ApiController
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
    )
    if @team.save
      render json: { status: 'SUCCESS', message: 'Team saved', data: @team }, status: :ok
    else
      render json: { status: 'ERROR', message: 'Team not saved', data: @team.errors }, status: :unprocessable_entity
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
      params.require([:name, :captain_id, :tent_number, :tent_type])
      @name = params[:name]
      @captain_id = params[:captain_id]
      @tent_number = params[:tent_number]
      @tent_type = params[:tent_type]
    end
end
