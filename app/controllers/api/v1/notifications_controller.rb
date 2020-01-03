class Api::V1::NotificationsController < ApiController
  rescue_from ActiveRecord::RecordNotFound, :with => :record_not_found

  # GET /api/v1/notifications/:user
  def show
    if user = User.find(params[:id])
      @notifications = user.notifications
        data = {
            notifications: user.notifications
        }
        render json: { status: 'SUCCESS', message: 'User notifications found.', data: data } , status: :ok
      else
        render json: { status: 'ERROR', message: 'ID not found.' }, status: :unprocessable_entity
      end
  end

  # GET /api/v1/notifications
  # GET all notifications for the current user
  def index
    if current_user
      @notifications = current_user.notifications
      if @notifications
        data = {
            notifications: current_user.notifications
        }
        render json: { status: 'SUCCESS', message: 'Notifications found.', data: data } , status: :ok
      else
        render json: { status: 'ERROR', message: 'Notifications not found.' }, status: :unprocessable_entity
      end
    else
      render json: { status: 'ERROR', message: 'User must be logged in.' }, status: :unprocessable_entity
    end
  end

end