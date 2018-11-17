class Shift < ApplicationRecord
  has_many :user_shifts
  has_many :users, through: :user_shifts, dependent: :destroy
end
