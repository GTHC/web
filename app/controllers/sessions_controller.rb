class SessionsController < ApplicationController
  def create
    client = oauth_client
    redirect_uri = ENV['OAUTH_REDIRECT']
    token = client.auth_code.get_token(params[:code], redirect_uri: redirect_uri)
    if !validate_token(token.token)
      redirect_to '/'
    else
      user_info = JSON.parse(token.get('/oidc/userinfo').body)
      user = User.find_or_create_by_oauth(user_info)
      helpers.log_in(user, token.token)
      redirect_to '/app/'
    end
  end

  def destroy
    revoke_token session[:token]
    helpers.log_out
  end

  def redirect
    client = oauth_client
    redirect_to client.auth_code.authorize_url(redirect_uri: ENV['OAUTH_REDIRECT'])
  end

  private

  def duke_logout_url
  end
end
