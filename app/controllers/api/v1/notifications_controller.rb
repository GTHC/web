class Api::V1::NotificationsController < ApiController
  rescue_from ActiveRecord::RecordNotFound, :with => :record_not_found

  # GET /api/v1/notifications/:user
  def show
    if user = User.find(params[:id])
      @notifications = user.notifications
      @posts = Post.all
      data = {
          shift_notifications: user.notifications,
          announcements: @posts
      }
      render json: { status: 'SUCCESS', message: "Notifications for user with netid #{user.netid} found.", data: data } , status: :ok
    else
      render json: { status: 'ERROR', message: 'User not found.' }, status: :unprocessable_entity
    end
  end

  # GET /api/v1/notifications
  # GET all notifications for the current user
  def index
    if current_user
      @notifications = current_user.notifications
      @posts = Post.all
      if @notifications
        data = {
            notifications: current_user.notifications,
            announcements: @posts
        }
        render json: { status: 'SUCCESS', message: "Notifications for user with netid #{current_user.netid} found.", data: data } , status: :ok
      else
        render json: { status: 'ERROR', message: 'Notifications not found.' }, status: :unprocessable_entity
      end
    else
      render json: { status: 'ERROR', message: 'User must be logged in.' }, status: :unprocessable_entity
    end
  end

  def keys
    render json: {
      appId: ENV['ONESIGNAL_APP_ID'],
      key: ENV['ONESIGNAL_KEY']
    }, status: :ok
  end

end
