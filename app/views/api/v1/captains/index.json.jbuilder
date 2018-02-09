json.data @Captains do |cap|
  json.merge! cap.as_json({except: [:created_at, :updated_at]})
  json.name cap.user.name
  json.team cap.user.team.as_json({except: [:created_at, :updated_at]})
end
