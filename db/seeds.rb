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
  if !User.exists?(i)
    User.create!(
      id: i,
      name: Faker::Name.name,
      password: 'password',
      password_confirmation: 'password',
      email: Faker::Internet.email,
      team_id: rand(5),
    )
    Captain.create!(
      id: i,
      user_id: i
    )
  end
end


# Teams
if !Team.exists?(id: 0)
  team_0 = Team.create!(
    id: 0,
    name: 'Team 0',
    captain_id: 0,
    tent_number: 0,
    tent_type: 'black',
  )
  team_1 = Team.create!(
    id: 1,
    name: 'Team 1',
    captain_id: 0,
    tent_number: 1,
    tent_type: 'blue',
  )
  team_2 = Team.create!(
    id: 2,
    name: 'Team 2',
    captain_id: 2,
    tent_number: 2,
    tent_type: 'black',
  )
  team_3 = Team.create!(
    id: 3,
    name: 'Team 3',
    captain_id: 3,
    tent_number: 3,
    tent_type: 'white',
  )
  team_4 = Team.create!(
    id: 4,
    name: 'Team 4',
    captain_id: 0,
    tent_number: 4,
    tent_type: 'dirty black',
  )
  team_5 = Team.create!(
    id: 5,
    name: 'Team 5',
    captain_id: 0,
    tent_number: 5,
    tent_type: 'dirty blue',
  )
end

for i in 1..25
  fake_email = Faker::Internet.email
  User.create!(
    name: Faker::Name.name,
    password: 'password',
    password_confirmation: 'password',
    email: fake_email,
    team_id: rand(5),
  );
end

for i in 1..100
  @id = User.all.ids.sample
  @curr_user = User.find(@id)
  @team_id = @curr_user.team.id
  @now = Time.now
  @later = @now + rand(1..10).hours
  Shift.create!(
    user_id: @id,
    team_id: @team_id,
    start_time: @now,
    end_time: @later,
    note: Faker::Lorem.paragraph,
  )
end
