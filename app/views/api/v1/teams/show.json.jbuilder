json.merge! @team.as_json({except: [:created_at, :updated_at]})
json.users @team.users do |user|
  json.merge! user.as_json({except: [:created_at, :updated_at]})
  json.avatarURL url_for(user.avatar) if user.avatar.attached?
  json.availabilities user.availabilities.as_json
end
