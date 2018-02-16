json.merge! @Shifts.as_json({except: [:created_at, :updated_at]})
