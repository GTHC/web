Rails.application.routes.draw do

  resources :posts
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  # Page rendering
  root 'pages#index'
  get 'app', to: 'pages#index'
  get 'app/*path', to: 'pages#index'
  get 'tenting101', to: 'pages#index'
  get 'about', to: 'pages#index'
  get 'reset_password', to: 'pages#index'
  get 'edit_password', to: 'pages#index'
  get 'edit_password.32', to: 'pages#index'

  # Login/Logout
  post 'login', to: 'api/v1/users#login'
  get 'login', to:'pages#index'
  post 'logout', to: 'api/v1/users#logout'

  # Devise
  devise_for :users

  # Analytics
  authenticate :admin_user do
    mount Blazer::Engine, at: "blazer"
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      resources :shifts, :teams, :captains, :users
      post 'user/token_change_password', to: 'users#token_reset_password'
      post 'user/forgot_password', to: 'users#forgot_password'
      get 'user/session', to: 'users#timeout'
      post 'user/shifts', to: 'users#shifts'

      # user
      put 'user/password/check', to: 'users#password_check'
      post 'user/avatar', to: 'users#update_avatar'
      post 'user/availability', to: 'users#update_availability'
      delete 'user/availability/:id', to: 'users#destroy_availability'

      devise_scope :user do
        get "edit_password", to: "devise/passwords#edit"
      end

      # team
      get 'team/hours', to: 'teams#team_hours'


    end
  end
end
