class Api::V1::SessionsController < ApiController
  # purpose - checks if users' session is still live
  # GET /api/v1/sessions
  def index
    if !session[:user_id].nil? && validate_token(session[:token])
      user = User.find(session[:user_id])
      data = format_user_data({
        user: user.as_json,
        team: nil,
        captain: nil,
      })
      if team = user.team
        data = format_user_data({
          user: user.as_json,
          team: user.team.as_json,
          captain: user.team.captain,
        })
      end
      render json: { message: 'User logged in.', status: true, data: data }
    else
      render json: { message: 'User not logged in.', status: false }
    end
  end
end
