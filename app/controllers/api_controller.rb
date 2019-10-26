class ApiController < ApplicationController
  rescue_from ActionController::ParameterMissing, :with => :param_missing

  before_action :set_default_format, :is_authenticated

  def current_user
    if params[:mobile]
      token = OAuth2::AccessToken.new(oauth_client, params[:token])
      user_info = JSON.parse(token.get('/oidc/userinfo').body)
      @current_user = User.find_or_create_by_oauth(user_info)
      @current_user
    else
      @current_user ||= session[:user_id] && User.find_by(id: session[:user_id])
      @current_user
    end
  end

  private
    def set_default_format
      request.format = :json
    end

    def is_authenticated
      if params[:mobile]
        if params[:user_netid].nil? or !validate_token(params[:token])
          puts 'tst'
          puts params[:user_netid].nil?
          puts !validate_token(params[:token])
          render json: { message: 'Authentication failed. Check token or user session.', status: false }
        end
      else
        if session[:user_id].nil? or !validate_token(session[:token])
          render json: { message: 'Authentication failed. Check token or user session.', status: false }
        end
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
