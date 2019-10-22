module SessionsHelper
  def log_out
    session.delete(:user_id)
    session.delete(:token)
  end

  def log_in(user, token)
    session[:user_id] = user.id
    session[:token] = token
  end
end
