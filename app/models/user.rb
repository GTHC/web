class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  belongs_to :team, optional: true

  has_many :user_shifts
  has_many :shifts, through: :user_shifts, dependent: :destroy

end
