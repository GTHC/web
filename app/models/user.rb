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

  def self.find_or_create_by_oauth(user_info)
    netid = user_info["dukeNetID"]
    name = user_info["name"]
    email = user_info["email"]

    # make sure User does not throw any index errors
    if email == "" || email == nil
      email = netid + "@duke.edu"
    end
    user = find_by(netid: netid) || create!(netid: netid, name: name, email: email)
    user
  end

  def remove_shifts_by_date(date)
    shifts_to_remove = shifts.where(start_time: date.beginning_of_day..date.end_of_day)
    shifts_to_remove.each do |shift|
      shift.destroy
    end
  end

end
