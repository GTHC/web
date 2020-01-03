require 'net/http'
require 'json'
require 'jsonapi-resources'

class Notification < ApplicationRecord
    belongs_to :user
end