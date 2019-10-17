Rails.application.config.middleware.use OmniAuth::Builder do
  provider :gthc_oauth2, ENV['OAUTH_CLIENT'], ENV['OAUTH_KEY']
end
