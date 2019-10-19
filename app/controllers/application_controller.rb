class ApplicationController < ActionController::Base
  # protect_from_forgery with: :exception
  def current_user
    @current_user ||= session[:user_id] && User.find_by(id: session[:user_id])
  end

  def oauth_client
    client_id = ENV['OAUTH_CLIENT']
    client_secret = ENV['OAUTH_KEY']
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
    # TODO: (amanmibra) add introspect token check
    true
  end

  # def create_oauth_client
  #   require 'oauth2'
  #   client_id = ENV['OAUTH_CLIENT']
  #   client_secret = ENV['OAUTH_KEY']
  #   @@client = OAuth2::Client.new(
  #      client_id,
  #      client_secret,
  #     :site => "https://oauth.oit.duke.edu/oidc",
  #     :authorize_url =>  "/oidc/authorize",
  #     :token_url =>  "/oidc/token"
  #   )
  #   url = @@client.auth_code.authorize_url(redirect_uri: ENV['OAUTH_REDIRECT'])
  #   puts url
  #   token = @@client.auth_code.get_token('glPSUX', redirect_uri: ENV['OAUTH_REDIRECT'])
  #   puts token
  #   user_info = JSON.parse(token.get('/oidc/userinfo').body)
  #   puts user_info
  #   auth_value = Base64.encode64("#{client_id}:#{client_secret}").gsub("\n", "")
  #   introspect = token.post('/oidc/introspect', :headers => {'Authorization' => "Basic #{client_secret}"})
  #
  #   puts 'introspect'
  #   puts introspect
  # end
end

=begin
require 'oauth2'
require 'byebug'
client_id = "colab_oauth_example"
client_secret = "AIqbtuXOg-EJgmaG_6eOOwEd3LUdoSGVTDh0hV5FuJzyICQqevv9bkZKkzVOINYbHVq3Vbu1Ge7_F4KywyGSjt4"
auth_value = Base64.encode64("#{client_id}:#{client_secret}").gsub("\n", "")
client = OAuth2::Client.new(
  client_id,
  client_secret,
  :site => "https://oauth.oit.duke.edu/oidc",
  :authorize_url =>  "/oidc/authorize",
  :token_url =>  "/oidc/token"
)
code_url = client.auth_code.authorize_url(:redirect_uri => 'https://google.com')
# => "https://example.org/oauth/authorization?response_type=code&client_id=client_id&redirect_uri=http://localhost:8080/oauth2/callback"
puts code_url
puts "Input Auth Code: "
code = gets.chomp
auth = Base64.encode64("#{client_id}:#{client_secret}")

token = client.auth_code.get_token(code, :redirect_uri => 'https://google.com')
# byebug
user_info = JSON.parse(token.get('/oidc/userinfo').body)
puts user_info
byebug
# introspect = token.get('/oidc/introspect', :headers => {'Authorization' => "Basic #{auth_value}"})


# response = token.get('/api/resource', :params => { 'query_foo' => 'bar' })
# response.class.name

=end
