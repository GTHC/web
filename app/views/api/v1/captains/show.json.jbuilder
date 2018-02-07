json.merge! @captain.as_json({except: [:created_at, :updated_at]})
json.name @captain.user.name
json.team @captain.team.as_json({except: [:created_at, :updated_at]})
