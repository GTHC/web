class Team < ApplicationRecord
  has_many :user
  has_one :captain
end
