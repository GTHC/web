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

  def team_hours
    if current_user
      @team = current_user.team
      data = []
      @team.users.each do |user|
        data.push(user_hours_count(user))
      end
      render json: { status: 'SUCCESS', message: 'Hour breakdown calculated.', data: data }, status: :ok
    else
      render json: { status: 'ERROR', message: 'Make sure user is logged in' }, status: :unprocessable_entity
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

    def user_hours_count(user)
      # week
      last_week_shifts = user.shifts.where(start_time: 1.week.ago...Time.now)

      last_week_night_count = count_night_shifts(last_week_shifts)
      last_week_day_count = count_all_shift_hours(last_week_shifts) - last_week_night_count

      # all
      all_shifts = user.shifts
      all_night_count = count_night_shifts(all_shifts)
      all_day_count = count_all_shift_hours(all_shifts) - all_night_count

      data = {
        week: {
          day: last_week_day_count,
          night: last_week_night_count
        },
        all: {
          day: all_day_count,
          night: all_night_count,
        },
        name: user.name,
        id: user.id,
      }
      data[:avatarURL] = url_for(user.avatar) if user.avatar.attached?
      data
    end

    def count_all_shift_hours(shifts)
      output = 0
      shifts.each do |shift|
        output = output + get_shift_time_length(shift)
      end
      output
    end

    def count_night_shifts(shifts)
      output = 0
      shifts.each do |shift|
        start_time = shift.start_time.in_time_zone('America/New_York')
        start_night = start_time.change({ hour: 2, min: 0 })
        end_night = start_time.change({ hour: 6, min: 59, sec: 59 })
        if start_time >= start_night and end_night > start_time
          output = output + get_shift_time_length(shift)
        end
      end
      output
    end

    def get_shift_time_length(shift)
      ((shift.end_time - shift.start_time).to_f / 1.hour).round
    end
end
