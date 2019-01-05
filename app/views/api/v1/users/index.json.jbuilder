json.array! @Users do |user|
  json.merge! user.as_json({except: [:created_at, :updated_at]})
  json.avatarURL url_for(user.avatar) if user.avatar.attached?
  json.team user.team.as_json({except: [:created_at, :updated_at]})
end
