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
        @Shifts = Shift.where(user_id: current_user.id)
      end
    end
end
