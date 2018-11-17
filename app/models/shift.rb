class Shift < ApplicationRecord
  belongs_to :team

  has_many :user_shifts
  has_many :users, through: :user_shifts, dependent: :destroy
end
