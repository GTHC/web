class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  # TODO(Aman): Properly remove devise and its attributes from User model
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  belongs_to :team, optional: true

  has_many :user_shifts, dependent: :destroy
  has_many :shifts, -> { distinct }, through: :user_shifts, dependent: :destroy

  has_many :visits, class_name: "Ahoy::Visit"
  has_one_attached :avatar

  has_many :availabilities
end
