ActiveAdmin.register Post do
  permit_params :title, :body
  form do |f|
    f.inputs do
      f.input :title, required: true
      f.input :body
    end
    f.actions
  end

  controller do
    def create
      # Good
      @post = Post.new(permitted_params[:post])
      puts @post.title, @post.body
      puts "Making new post notification"
      helpers.post_notification(title=@post.title, content=@post.body)
      if @post.save
        redirect_to '/admin/posts'
      end
    end
  end
end