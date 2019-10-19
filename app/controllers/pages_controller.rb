class PagesController < ApplicationController
  def index
    puts 'create_oauth_client'
    create_oauth_client
  end
end
