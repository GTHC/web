# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'faker'

# Captains

for i in 0..5
  @user = User.create!(
    name: Faker::Name.name,
    password: 'password',
    password_confirmation: 'password',
    email: Faker::Internet.email,
    team_id: rand(1..5),
  )
  Captain.create!(
    user_id: @user.id
  )
end


# Teams
team_1 = Team.create!(
  name: 'Team 1',
  captain_id: 1,
  tent_number: 1,
  tent_type: 'blue',
)
team_2 = Team.create!(
  name: 'Team 2',
  captain_id: 2,
  tent_number: 2,
  tent_type: 'black',
)
team_3 = Team.create!(
  name: 'Team 3',
  captain_id: 3,
  tent_number: 3,
  tent_type: 'white',
)
team_4 = Team.create!(
  name: 'Team 4',
  captain_id: 4,
  tent_number: 4,
  tent_type: 'dirty black',
)
team_5 = Team.create!(
  name: 'Team 5',
  captain_id: 5,
  tent_number: 5,
  tent_type: 'dirty blue',
)

for i in 1..25
  User.create!(
    name: Faker::Name.name,
    password: 'password',
    password_confirmation: 'password',
    email: Faker::Internet.email,
    team_id: rand(1..5),
  );
end

for i in 1..100
  @ids = User.all.ids.sample (rand(1..5))
  @first_user = User.find(@ids[0])
  @team_id = @first_user.team.id
  @now = Time.now
  @later = @now + rand(1..10).hours
  @shift = @first_user.shifts.create!(
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
