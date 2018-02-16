class Api::V1::ShiftsController < ApiController
  before_action :set_user
  def show
  end

  def index
  end

  private

    def set_user
      if params[:id]
        @shift = Shift.find(params[:id])
      else
        @Shifts = Shift.where(id: current_user.team.id)
      end
    end
end
