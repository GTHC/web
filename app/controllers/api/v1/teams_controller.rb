class Api::V1::TeamsController < ApiController
  before_action :set_user
  def show
  end

  def index
  end

  private

    def set_user
      if params[:id]
        @team = Team.find(params[:id])
      else
        @Teams = Team.all
      end
    end
end
