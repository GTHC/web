class Team < ApplicationRecord
  has_many :users
  has_many :shifts
  belongs_to :captain
end
