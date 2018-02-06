Rails.application.routes.draw do
  resources :shifts
  devise_for :users
  root 'pages#index'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      resources :shifts do
        resource :user
      end
      resources :teams do
        resource :captain
      end
      resources :users, :captains
    end
  end
  end
end
