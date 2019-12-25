class Api::v1::CaptainsController < ApiController
  before_action :set_user
  def show
  end

  def index
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
                      :email,
                      :phone,
                      :password,
                      :password_confirmation,
                      :team_name,
                      :tent_type ])
    end
end
