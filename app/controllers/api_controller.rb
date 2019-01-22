class ApiController < ApplicationController
  before_action :set_default_format

  private
    def set_default_format
      request.format = :json

      validate_api_key_params
      
      unless params[:api_key] == ENV['INTERNAL_API_KEY']
        render json: { status: 'ERROR', message: 'API key is invalid' }, status: :unauthorized
      end
    end

    def validate_api_key_params
      params.require([:api_key])
    end
end
