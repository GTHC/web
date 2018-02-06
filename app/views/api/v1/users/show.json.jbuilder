json.id @user.id
json.email @user.email
json.name @user.name
json.team_id @user.team_id
json.team do
  json.merge! @user.team.as_json({except: [:created_at, :updated_at]})
end
