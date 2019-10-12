class Api::V1::SessionsController < ApiController
  # purpose - checks if users' session is still live
  # GET /api/v1/sessions
  def index
    if !session[:user_id].nil?
      user = User.find(session[:user_id])
      data = {
        user: user,
        team: nil,
        captain: nil,
      }
      if team = user.team
        data = {
          user: user,
          team: user.team,
          captain: user.team.captain,
        }
      end
      render json: { message: 'User logged in.', status: true, data: data }
    else
      render json: { message: 'User not logged in.', status: false }
    end
  end
end
