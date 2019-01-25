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

  # GET /api/v1/team/hours
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

  # PUT /api/v1/team/availabilities
  def show_availabilities
    if current_user
      validate_avail_params
      @team = current_user.team
      data = []
      @team.users.each do |user|
        data.push(user_availability(user))
      end
      render json: { message: 'Availabilities has been calculated!', data: data }, status: :ok
    else
      render json: { message: 'User not logged in.', status: 'ERROR' }, status: :unprocessable_entity
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

    def validate_avail_params
      params.require([:start_time, :end_time])
      @start = params[:start_time].to_datetime
      @end = params[:end_time].to_datetime
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

    def user_availability(user)
      availabilities = user.availabilities

      avail = availabilities.where(somewhat: false)
      somewhat = availabilities.where(somewhat: true)

      # Finding Full (non-somewhat) Availabilities
      avail_query = avail.where('start < ? AND availabilities.end > ?', @start, @end)
      is_avail = avail_query.length > 0

      # Finding Somewhat Availabilities

      ## These queries cover both availabilities that cover the shift
      ## entirely or partly
      somewhat_query_1 = somewhat.where('start < ? AND availabilities.end > ?', @start, @end)
      somewhat_query_2 = somewhat.where('start > ? AND start < ?', @start, @end)
      somewhat_query_3 = somewhat.where('availabilities.end > ? AND availabilities.end < ?', @start, @end)

      is_somewhat = somewhat_query_1.length > 0 || somewhat_query_2.length > 0 || somewhat_query_3.length > 0

      data = {
        id: user.id,
        name: user.name
      }
      # add avatar
      data[:avatarURL] = url_for(user.avatar) if user.avatar.attached?

      # level is the referring to availability level, which uses 0,1,2 to represent:
      ## 0: Unavailable
      ## 1: Somewhat Available
      ## 2: Available
      if is_avail
        data[:level] = 2
      elsif is_somewhat
        data[:level] = 1
      else
        data[:level] = 0
      end
      data
    end
end
