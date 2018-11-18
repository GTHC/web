Rails.application.routes.draw do

  # Page rendering
  root 'pages#index'
  get 'app', to: 'pages#index'
  get 'app/*path', to: 'pages#index'

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
      get 'user/shifts', to: 'users#shifts'
    end
  end
end
