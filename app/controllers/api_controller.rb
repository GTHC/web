class ApiController < ApplicationController
  rescue_from ActionController::ParameterMissing, :with => :param_missing

  before_action :set_default_format, :is_authenticated

  def current_user
    # TODO: (amanmibra) Open non-web
    @current_user ||= session[:user_id] && User.find_by(id: session[:user_id])
  end

  private
    def set_default_format
      request.format = :json
    end

    def is_authenticated
      # TODO: (amanmibra) Open non-web
      if session[:user_id].nil? or !validate_token(session[:token])
        render json: { message: 'Authentication failed. Check token or user session.', status: false }
      end
    end

    def format_user_data(data)
      ## user
      # Processing data object as it is not an ActiveRecord
      # add avatarURL if avatar
      @user = User.find(data[:user]["id"])
      @team = @user.team
      data[:user][:avatarURL] = url_for(@user.avatar) if @user.avatar.attached?

      # add availability info to data
      data[:user][:availabilities] = @user.availabilities.as_json if @user.availabilities

      ## team
      # add avatarURL and availabilities to users in a team
      if data[:team]
        data[:team][:captain] = @team.captain.as_json
        data[:team][:users] = @team.users.as_json
        data[:team][:users].each do |u|
          user = User.find(u["id"])
          u[:avatarURL] = url_for(user.avatar) if user.avatar.attached?
          u[:availabilities] = user.availabilities.as_json
        end
      end

      data
    end

    def param_missing(exception)
      render json: { status: 'ERROR', message: exception }, status: :unprocessable_entity
    end
end
