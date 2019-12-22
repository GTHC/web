class PagesController < ApplicationController
  def index
  end

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

  helper_method :current_user

end
