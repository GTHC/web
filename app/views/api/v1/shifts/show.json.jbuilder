json.merge! @shifts.as_json({except: [:created_at, :updated_at]})
