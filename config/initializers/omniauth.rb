Rails.application.config.middleware.use OmniAuth::Builder do
  provider :duke_oauth2, ENV['OAUTH_CLIENT'], ENV['OAUTH_KEY']
end
