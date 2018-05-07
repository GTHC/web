class Api::V1::CaptainsController < ApiController
  before_action :set_user
  def show
  end

  def index
  end

  def create
    # Creating a new user, captain, and team
    # Create User -> Create Captain -> Create Team -> Add Team ID to User
    validate_params
    # Create User
    @user = User.create!(
      name: params[:user_name],
      email: params[:email],
      password: params[:password],
      password_confirmation: params[:password_confirmation]
    )
    # Create Captain
    @captain = Captain.create!(user_id: @user.id)
    # Create Team
    @team = Team.create!(
      name: params[:team_name],
      tent_number: params[:tent_number],
      tent_type: params[:tent_type],
      captain_id: @captain.id
    )
    if !@team.save
      render json: { status: 'ERROR', message: 'Team not saved', data: @team.errors }, status: :unprocessable_entity
    elsif !@captain.save
      render json: { status: 'ERROR', message: 'Captain not saved', data: @captain.errors }, status: :unprocessable_entity
    elsif !@user.save
      render json: { status: 'ERROR', message: 'User not saved', data: @user.errors }, status: :unprocessable_entity
    else
      render json: { status: 'SUCCESS', message: 'User, Captain, and Team created', data: {
          team: @team,
          captain: @captain,
          user: @user,
        } }, status: :ok
    end

  end

  private

    def set_user
      if params[:id]
        @captain = Captain.find(params[:id])
      else
        @Captains = Captain.all
      end
    end

    def validate_params
      params.require([:user_name,
                      :password,
                      :password_confirmation,
                      :email,
                      :team_name,
                      :tent_number,
                      :tent_type ])
    end
end
