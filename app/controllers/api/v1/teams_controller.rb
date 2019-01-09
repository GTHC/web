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

  def shift_availabilities
    validate_shift_params
    data = team_availability(@day, @s, @e)
    render json: { message: 'Team availability has been calculated.', data: data }, status: :ok
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
      @tent_type = params[:tent_type]
      @passcode = params[:passcode]
    end

    def validate_update_params
      params.require([:id, :name, :tent_type])
      @prime_params = {
        id: params[:id],
        name: params[:name],
        tent_type: params[:tent_type],
      }
    end

    def validate_shift_params
      params.require([:day, :starting, :ending])
      @day = params[:day].to_i
      @s = params[:starting].to_i
      @e = params[:ending].to_i
    end

    def param_missing(exception)
      render json: { status: 'ERROR', message: exception }, status: :unprocessable_entity
    end

    # find the lowest availability value (0, 1, or 2) in a range of time on
    # a certain day for each user in a team
    def team_availability(day, s, e)
      # s is starting time position, and e is ending time pos
      @team = current_user.team
      data = [];
      for user in @team.users
        user.availability.map! {|arr| arr.map.map(&:to_i)}
        avail = user.availability[day]
        min_avail = avail[s]
        for i in s..e
          if avail[i] < min_avail
            min_avail = avail[i]
          end
        end
        userData = {
            id: user.id,
            name: user.name,
            shift_availability: min_avail
            }
        userData[:avatarURL] = url_for(user.avatar) if user.avatar.attached?
        data.push(userData)
      end
      return data
    end
end
