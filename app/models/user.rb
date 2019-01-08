class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  belongs_to :team, optional: true

  has_many :user_shifts, dependent: :destroy
  has_many :shifts, -> { distinct }, through: :user_shifts, dependent: :destroy

  has_many :visits, class_name: "Ahoy::Visit"
  has_one_attached :avatar

end
