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

  # Login/Logout
  post 'login', to: 'api/v1/users#login'
  get 'login', to:'pages#index'
  post 'logout', to: 'api/v1/users#logout'

  # Devise
  devise_for :users

  # Analytics
  # TODO(anesu): Authenticate with admin users
  authenticate :admin_user do
    mount Blazer::Engine, at: "blazer"
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      resources :shifts, :teams, :captains, :users
      get 'user/session', to: 'users#timeout'
      post 'user/shifts', to: 'users#shifts'

      # user
      put 'user/password/check', to: 'users#password_check'
      post 'user/availability', to: 'users#update_availability'
      post 'user/avatar', to: 'users#update_avatar'

      # team
      get 'team/availability', to: 'teams#shift_availabilities'
    end
  end
end
