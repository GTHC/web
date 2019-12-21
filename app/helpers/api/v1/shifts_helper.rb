module Api::V1::ShiftsHelper
  def validate_olson_params
    params.require([
      :date,
      :phase
    ])
  end

  def format_olson(date, phase, current_user)
    date = date.in_time_zone('America/New_York')
    team = current_user.team

    people = [] # arr of Person elements
    slotGrid = [] # arr of Slot arrays
    team.users.each_with_index do | user, index |
      # user.remove_shifts_by_date(date)
      dayFree, nightFree = get_free_count user
      dayScheduled, nightScheduled = get_scheduled_count user

      start_slot = date.beginning_of_day
      slots = []
      person = GTHC::Olson.Person.new(
        user.id,
        user.name,
        dayFree, nightFree,
        dayScheduled, nightScheduled
      )
      # 30 min slots
      for i in 0...48
       end_slot = start_slot + 30.minutes
       status = get_status_of_slot(user, start_slot, end_slot)
       is_night = is_slot_night(start_slot)
       slot = GTHC::Olson.Slot.new(
         user.id,
         start_slot,
         end_slot,
         phase,
         is_night,
         status,
         # row = i, position of slot on scheduleGrid
         # col = index, position of person on scheduleGrid
         # (check gthc/gthc for more details)
         i, index
       )
       slots.push slot
       start_slot = end_slot

       if status != "Unavailable"
         if is_night
           person.nightFree += 1
         else
           person.dayFree += 1
         end
       end
      end

      people.push person
      slotGrid.push slots
    end

    return people, slotGrid
  end

  def get_free_count(user)
    all_avail = user.availabilities
    nightFree = count_night_avails all_avail
    dayFree = all_avail.length - nightFree
    return dayFree, nightFree
  end

  def get_scheduled_count(user)
    all_shifts = user.shifts
    nightScheduled = count_night_shifts all_shifts
    dayScheduled = all_shifts.length - nightScheduled
    return dayScheduled, nightScheduled
  end

  def count_night_avails(availabilities)
    output = 0
    availabilities.each do |avail|
      start_time = avail.start.in_time_zone('America/New_York')
      start_night = start_time.change({ hour: 2, min: 0 })
      end_night = start_time.change({ hour: 6, min: 59, sec: 59 })
      if start_time >= start_night and end_night > start_time
        avail_length = ((avail.end - avail.start).to_f / 1.hour).round
        output = output + avail_length
      end
    end
    output
  end

  def count_night_shifts(shifts)
    output = 0
    shifts.each do |shift|
      start_time = shift.start_time.in_time_zone('America/New_York')
      start_night = start_time.change({ hour: 2, min: 0 })
      end_night = start_time.change({ hour: 6, min: 59, sec: 59 })
      if start_time >= start_night and end_night > start_time
        shift_length = ((shift.end_time - shift.start_time).to_f / 1.hour).round
        output = output + shift_length
      end
    end
    output
  end

  def get_availability_of_slot(user, start_slot, end_slot)
    user.availabilities.where('start <= ? AND availabilities.end >= ?', start_slot, end_slot)
  end

  def get_status_of_slot(user, start_slot, end_slot)
    avail = get_availability_of_slot(user, start_slot, end_slot)
    if avail.length == 0
      return "Unavailable"
    elsif avail.where(somewhat: true).length > 0
      return "Somewhat"
    end
    "Available"
  end

  def is_slot_night(start_slot)
    # if slot is in between 2:00 - 6:59 AM of that day, then it is a night slot
    start_night = start_slot.change({ hour: 2, min: 0 })
    end_night = start_slot.change({ hour: 6, min: 59, sec: 59 })

    start_slot >= start_night and end_night >= start_slot
  end
end
