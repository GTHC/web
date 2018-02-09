class Api::V1::CaptainsController < ApiController
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
end
