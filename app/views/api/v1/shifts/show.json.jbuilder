json.merge! @shift.as_json({except: [:created_at, :updated_at]})
