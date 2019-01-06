json.id @user.id
json.email @user.email
json.name @user.name
json.team_id @user.team_id
json.avatarURL url_for(@user.avatar) if @user.avatar.attached?
json.team do
  json.merge! @user.team.as_json({except: [:created_at, :updated_at]})
end
