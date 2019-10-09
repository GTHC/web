Rails.application.routes.draw do

  # Active Admin
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
  get 'edit_password.*', to: 'pages#index'

  # Login/Logout
  get 'login', to:'pages#index'
  # post 'login', to: 'api/v1/users#login'
  post 'logout', to: 'sessions#destroy'

  #oauth
  get '/auth/:provider/callback', to: 'sessions#create'

  # Analytics
  authenticate :admin_user do
    mount Blazer::Engine, at: "blazer"
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      resources :shifts, :teams, :captains, :users
      resources :sessions, only: [:index]

      # user shifts
      post 'user/shifts', to: 'users#shifts'

      # user avatar
      post 'user/avatar', to: 'users#update_avatar'

      ## user availability
      post 'user/availability', to: 'users#create_availability'
      put 'user/availability/:a_id', to: 'users#update_availability'
      delete 'user/availability/:a_id', to: 'users#destroy_availability'

      # team hour breakdown
      get 'team/hours', to: 'teams#team_hours'

      # team availabilities
      put 'team/availabilities', to: 'teams#show_availabilities'

    end
  end
end
