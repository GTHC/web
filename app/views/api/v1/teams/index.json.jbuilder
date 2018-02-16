json.array! @Teams do |team|
  json.merge! team.as_json({except: [:created_at, :updated_at]})
  json.users team.users do |user|
    json.merge! user.as_json({except: [:created_at, :updated_at]})
  end
end
