class SessionsController < ApplicationController
  def create
    puts 'test'
    puts auth_hash
    @user = User.find_or_create_by_oauth(auth_hash)
    if @user.nil?
      redirect_to '/'
    else
      log_in @user
      redirect_to '/app/'
    end
  end

  def destroy
   log_out
   redirect_to '/'
  end

  protected

  def auth_hash
    request.env['omniauth.auth']
  end
end
