class Shift < ApplicationRecord
  belongs_to :user
  has_one :team, through: :user
end
