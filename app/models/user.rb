class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  # TODO(Aman): Properly remove devise and its attributes from User model
  # devise :database_authenticatable, :registerable,
  #        :recoverable, :rememberable, :trackable, :validatable
  validates :email, :uniqueness => {:allow_blank => true}

  belongs_to :team, optional: true

  has_many :user_shifts, dependent: :destroy
  has_many :shifts, -> { distinct }, through: :user_shifts, dependent: :destroy

  has_many :visits, class_name: "Ahoy::Visit"
  has_one_attached :avatar

  has_many :availabilities

  def self.find_or_create_by_oauth(omniauth_hash)
    case omniauth_hash.provider
    when 'gthc_oauth2'
      netid = omniauth_hash.info.netid
      user = find_by(netid: netid) || create!(netid: netid)
      user
    else
      logger.error "Unknown OmniAuth provider #{omniauth_hash.provider}"
      nil
    end
  end

end
