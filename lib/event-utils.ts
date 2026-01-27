import { differenceInDays, differenceInHours, format, isSameDay } from "date-fns"

export interface EventDuration {
  isSingleDay: boolean
  numberOfDays: number
  hoursPerDay: number
  startDate: Date
  endDate: Date
  startTime: string
  endTime: string
  dateDisplay: string
  timeDisplay: string
  fullDisplay: string
}

/**
 * Calculates the duration and formatting information for an event
 */
export function calculateEventDuration(startDatetime: string, endDatetime: string): EventDuration {
  const startDate = new Date(startDatetime)
  const endDate = new Date(endDatetime)
  
  const isSingleDay = isSameDay(startDate, endDate)
  
  // Calculate number of days (including partial days)
  const numberOfDays = differenceInDays(endDate, startDate) + 1
  
  // Calculate hours between start time and end time on a single day
  const startHour = startDate.getHours()
  const startMinute = startDate.getMinutes()
  const endHour = endDate.getHours()
  const endMinute = endDate.getMinutes()
  
  // Calculate hours per day based on time difference
  const hoursPerDay = (endHour - startHour) + ((endMinute - startMinute) / 60)
  
  // Format times
  const startTime = format(startDate, "h:mm a")
  const endTime = format(endDate, "h:mm a")
  
  // Format dates
  let dateDisplay: string
  let timeDisplay: string
  let fullDisplay: string
  
  if (isSingleDay) {
    // Single day event: "January 1, 2025"
    dateDisplay = format(startDate, "MMMM dd, yyyy")
    timeDisplay = `${startTime} - ${endTime}`
    
    if (hoursPerDay >= 1) {
      const hours = Math.floor(hoursPerDay)
      const minutes = Math.round((hoursPerDay - hours) * 60)
      const durationText = minutes > 0 ? `${hours}h ${minutes}m` : `${hours} hour${hours !== 1 ? 's' : ''}`
      fullDisplay = `${dateDisplay} • ${timeDisplay} (${durationText})`
    } else {
      const minutes = Math.round(hoursPerDay * 60)
      fullDisplay = `${dateDisplay} • ${timeDisplay} (${minutes} minutes)`
    }
  } else {
    // Multi-day event: "January 1 - 3, 2025"
    const startMonth = format(startDate, "MMMM")
    const endMonth = format(endDate, "MMMM")
    const startDay = format(startDate, "dd")
    const endDay = format(endDate, "dd")
    const year = format(endDate, "yyyy")
    
    if (startMonth === endMonth) {
      dateDisplay = `${startMonth} ${startDay} - ${endDay}, ${year}`
    } else {
      dateDisplay = `${format(startDate, "MMMM dd")} - ${format(endDate, "MMMM dd")}, ${year}`
    }
    
    timeDisplay = `${startTime} - ${endTime} daily`
    
    const hours = Math.floor(hoursPerDay)
    const minutes = Math.round((hoursPerDay - hours) * 60)
    const durationText = minutes > 0 ? `${hours}h ${minutes}m` : `${hours} hour${hours !== 1 ? 's' : ''}`
    fullDisplay = `${dateDisplay} • ${numberOfDays} day${numberOfDays !== 1 ? 's' : ''} • ${timeDisplay} (${durationText} per day)`
  }
  
  return {
    isSingleDay,
    numberOfDays,
    hoursPerDay,
    startDate,
    endDate,
    startTime,
    endTime,
    dateDisplay,
    timeDisplay,
    fullDisplay
  }
}

/**
 * Formats a short version for event cards
 */
export function formatEventCardDate(startDatetime: string, endDatetime: string): { date: string; time: string; duration: string } {
  const duration = calculateEventDuration(startDatetime, endDatetime)
  
  if (duration.isSingleDay) {
    const hours = Math.floor(duration.hoursPerDay)
    const minutes = Math.round((duration.hoursPerDay - hours) * 60)
    const durationText = minutes > 0 ? `${hours}h ${minutes}m` : `${hours}hr${hours !== 1 ? 's' : ''}`
    
    return {
      date: duration.dateDisplay,
      time: duration.timeDisplay,
      duration: durationText
    }
  } else {
    const hours = Math.floor(duration.hoursPerDay)
    const durationText = `${duration.numberOfDays} days • ${hours}hrs/day`
    
    return {
      date: duration.dateDisplay,
      time: duration.timeDisplay,
      duration: durationText
    }
  }
}
