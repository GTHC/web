ActiveAdmin.register_page "Dashboard" do

  menu priority: 1, label: proc{ I18n.t("active_admin.dashboard") }

  content title: proc{ I18n.t("active_admin.dashboard") } do
    # div class: "blank_slate_container", id: "dashboard_default_message" do
    #   span class: "blank_slate" do
    #     span I18n.t("active_admin.dashboard_welcome.welcome")
    #     small I18n.t("active_admin.dashboard_welcome.call_to_action")
    #   end
    # end

    # Here is an example of a simple dashboard with columns and panels.
    #
    columns do

      column do
        panel "Admin Page Information" do
          h3 "Welcome to your admin page."
          para "Welcome developers and line monitors. This is the GTHC admin page, where you can directly view, create, edit or delete items from the GTHC database. This is also where line monitors can create their GTHC website-wide announcments by going to the Post page."
        end
      end

    end

    columns do
      column do
        panel "Adding admins" do
          para "As of now, admins will need to directly add/sign up other admins in order for them to join the admin page. Once joined, only the admin can edit their own information, such as email and password."
          para link_to "Add Admin Users Here", new_admin_admin_user_path, class: 'button'
        end
      end

      column do
        panel "Recent Posts" do
          last_posts = Post.last(10).reverse
          ul do
            last_posts.map do |post|
              title = post.title
              title ||= title = 'Post made on ' + post.created_at.to_s
              li link_to(title, admin_post_path(post))
            end
          end
        end
      end

    end

  end # content
end
