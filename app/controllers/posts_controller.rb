class PostsController < ApiController
  skip_before_action :is_authenticated
  before_action :set_post, only: [:edit]
  rescue_from ActiveRecord::RecordNotFound, with: :handle_record_not_found

  # GET /posts
  # GET /posts.json
  def index
    @posts = Post.all
    render json: {
      status: 'SUCCESS',
      data: @posts,
    }, status: :ok
  end

  # GET /posts/1
  # GET /posts/1.json
  def show
    if Post.exists?(params[:id])
      post = Post.find(params[:id])
      render json: {
        status: 'SUCCESS',
        data: post,
      }, status: :ok
    else
      render json: {
        status: 'ERROR',
        message: 'Post not found'
      }, status: :not_found
    end
  end

  # GET /posts/new
  def new
    @post = Post.new
  end

  # GET /posts/1/edit
  def edit
  end

  # POST /posts
  # POST /posts.json
  def create
    @post = Post.new(post_params)

    if @post.save
      render json: {
        status: 'SUCCESS',
        message: 'Post created successfully.',
        data: @post
      }, status: :ok
    else
      render json: {
        status: 'ERROR',
        message: 'Post creation failed.',
      }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /posts/1
  # PATCH/PUT /posts/1.json
  def update
    if Post.exists?(params[:id])
      post = Post.find(params[:id])
      if post.update(post_params)
        render json: {
          status: 'SUCCESS',
          message: 'Post updated successfully.',
          data: post
        }, status: :ok
      else
        render json: {
          status: 'ERROR',
          message: 'Post unable to update.',
        }, status: :unprocessable_entity
      end
    else
      render json: {
        status: 'ERROR',
        message: 'Post not found.',
      }, status: :not_found
    end
  end

  # DELETE /posts/1
  # DELETE /posts/1.json
  def destroy
    if Post.exists?(params[:id])
      post = Post.find(params[:id])
      if post.destroy
        render json: {
          status: 'SUCCESS',
          message: 'Post deleted successfully.',
        }, status: :ok
      else
        render json: {
          status: 'ERROR',
          message: 'Post unable to delete.',
        }, status: :unprocessable_entity
      end
    else
      render json: {
        status: 'ERROR',
        message: 'Post not found.',
      }, status: :not_found
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_post
      respond_to do |format|
        format.json {
          render json: {
            message: "Post not found.",
            status: "Error"
          }, status: :not_found
        }
      end
      @post = Post.find(params[:id])

    end

    def handle_record_not_found
      # Send it to the view that is specific for Post not found
      render :not_found
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def post_params
      params.permit([:title, :body])
    end
end
