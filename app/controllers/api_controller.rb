class ApiController < ApplicationController
  rescue_from ActionController::ParameterMissing, :with => :param_missing

  before_action :set_default_format, :is_authenticated

  def validate_token(token)
    # TODO: (amanmibra) add introspect token check
    true
  end

  private
    def set_default_format
      request.format = :json
    end

    def is_authenticated
      if !session[:user_id].nil? and validate_token session[:token]

      else
        render json: { message: 'User not logged in.', status: false }
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
      data[:user][:availabilities] = @user.availabilities.as_json

      ## team
      # add avatarURL and availabilities to users in a team
      data[:team][:users] = @team.users.as_json
      data[:team][:users].each do |u|
        user = User.find(u["id"])
        u[:avatarURL] = url_for(user.avatar) if user.avatar.attached?
        u[:availabilities] = user.availabilities.as_json
      end

      data
    end

    def param_missing(exception)
      render json: { status: 'ERROR', message: exception }, status: :unprocessable_entity
    end
end
