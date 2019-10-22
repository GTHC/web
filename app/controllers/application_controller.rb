class ApplicationController < ActionController::Base
  # protect_from_forgery with: :exception

  def oauth_client
    client = OAuth2::Client.new(
       client_id,
       client_secret,
      :site => "https://oauth.oit.duke.edu/oidc",
      :authorize_url =>  "/oidc/authorize",
      :token_url =>  "/oidc/token"
    )
    client
  end

  def validate_token(token)
    require 'uri'
    uri = URI("https://oauth.oit.duke.edu/oidc/introspect?token=#{token}")
    auth_value = Base64.encode64("#{client_id}:#{client_secret}").gsub("\n", "")

    # HTTP objects
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    request = Net::HTTP::Post.new(uri)
    request["authorization"] = "Basic #{auth_value}"

    # request
    response = http.request(request)
    body = JSON.parse(response.body)
    body["active"]
  end

  def revoke_token(token)
    require 'uri'
    uri = URI("https://oauth.oit.duke.edu/oidc/revoke?token=#{token}")
    auth_value = Base64.encode64("#{client_id}:#{client_secret}").gsub("\n", "")

    # HTTP objects
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    request = Net::HTTP::Post.new(uri)
    request["authorization"] = "Basic #{auth_value}"

    http.request(request)
  end

  private

  def client_id
    client_id = ENV['OAUTH_CLIENT']
    client_id
  end

  def client_secret
    client_secret = ENV['OAUTH_KEY']
    client_secret
  end
end
