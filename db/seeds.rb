# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'faker'

# Captains

if Rails.env.production? && !ENV['STAGING']
  AdminUser.create!(email: 'admin@gthc.io', password: 'password', password_confirmation: 'password')
else
  for i in 1..5
    @user = User.create!(
      name: Faker::Name.name,
      email: Faker::Internet.email,
      phone: Faker::PhoneNumber.cell_phone,
      team_id: i,
    )
    Captain.create!(
      user_id: @user.id
    )
  end


  # Teams
  team_1 = Team.create!(
    name: 'Team 1',
    captain_id: 1,
    tent_type: 'Blue',
    passcode: 'ABC123'
  )
  team_2 = Team.create!(
    name: 'Team 2',
    captain_id: 2,
    tent_type: 'Black',
    passcode: 'ABC123'
  )
  team_3 = Team.create!(
    name: 'Team 3',
    captain_id: 3,
    tent_type: 'White',
    passcode: 'ABC123'
  )
  team_4 = Team.create!(
    name: 'Team 4',
    captain_id: 4,
    tent_type: 'Dirty Black',
    passcode: 'ABC123'
  )
  team_5 = Team.create!(
    name: 'Team 5',
    captain_id: 5,
    tent_type: 'Dirty Blue',
    passcode: 'ABC123'
  )

  for i in 1..25
    User.create!(
      name: Faker::Name.name,
      phone: Faker::PhoneNumber.cell_phone,
      email: Faker::Internet.email,
      team_id: rand(1..5),
    );
  end

  # Shift
  for i in 1..100
    @team = Team.order("RANDOM()").first
    @ids = @team.users.ids.sample rand(1..5)
    @first_user = User.find(@ids[0])
    @team_id = @first_user.team.id
    @now = Time.now + rand(-10..10).hours + rand(-2..2).days
    @later = @now + rand(1..5).hours
    @shift = @first_user.shifts.create!(
      title: Faker::Book.title,
      team_id: @team_id,
      start_time: @now,
      end_time: @later,
      note: Faker::Lorem.paragraph,
    )
    for @id in @ids[1..-1]
      @curr_user = User.find(@id)
      @curr_user.shifts << @shift
    end
  end

  # Availability
  User.all.each do |user|
    start = Time.now.in_time_zone('America/New_York').beginning_of_day
    while start < start.end_of_day - 1.hour
      status = [0, 0, 1, 2].sample
      end_time = start + (30.minutes * (status + 1))
      # Unavailable, Somewhat, Available
      if status > 0
        user.availabilities.create!(
          start: start,
          end: end_time,
          somewhat: status == 1
        )
      end
      start = end_time
    end
  end

  # Active Admin
  AdminUser.create!(email: 'admin@gthc.io', password: 'password', password_confirmation: 'password')
end
