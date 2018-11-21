class Shift < ApplicationRecord
  belongs_to :team

  has_many :user_shifts, dependent: :destroy
  has_many :users, -> { distinct }, through: :user_shifts, dependent: :destroy
end
