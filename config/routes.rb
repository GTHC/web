Rails.application.routes.draw do

  # Page rendering
  root 'pages#index'
  get 'app', to: 'pages#index'
  get 'app/*path', to: 'pages#index'
  get 'tenting101', to: 'pages#index'
  get 'about', to: 'pages#index'
  get 'reset_password', to: 'pages#index'

  # Login/Logout
  post 'login', to: 'api/v1/users#login'
  get 'login', to:'pages#index'
  post 'logout', to: 'api/v1/users#logout'

  # Devise
  devise_for :users

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      resources :shifts, :teams, :captains, :users
      post 'user/forgot_password', to: 'users#forgot_password'
      get 'user/session', to: 'users#timeout'
      post 'user/shifts', to: 'users#shifts'
      put 'user/password/check', to: 'users#password_check'
      post 'user/availability', to: 'users#update_availability'
      get 'team/availability', to: 'teams#shift_availabilities'
    end
  end
end
