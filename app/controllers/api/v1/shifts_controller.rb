class Api::V1::ShiftsController < ApiController
  before_action :set_user
  def show
  end

  def index
  end

  private

    def set_user
      if params[:id]
        # GET shift at an id within the current user's team
        @shift = current_user.team.shifts.find(params[:id])
      else
        # GET all shifts under the current user's team
        @Shifts = current_user.team.shifts
      end
    end
end
