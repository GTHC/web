json.merge! @Users.as_json({except: [:created_at, :updated_at]})
