import { addDays, differenceInDays, differenceInHours, format, isSameDay as dateFnsIsSameDay } from "date-fns"

export function isOvernightEvent(start: Date | undefined, end: Date | undefined): boolean {
  if (!start || !end) return false;
  if (dateFnsIsSameDay(start, end)) return false;
  return differenceInHours(end, start) < 24;
}

export function isSameDayOrOvernight(start: Date | undefined, end: Date | undefined): boolean {
  if (!start || !end) return true;
  return dateFnsIsSameDay(start, end) || isOvernightEvent(start, end);
}

export function getEventDayCount(start: Date, end: Date): number {
  const diffMs = end.getTime() - start.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  return Math.max(1, diffDays + 1);
}

export function getEffectiveEndDate(start: Date, end: Date): Date {
  const dayCount = getEventDayCount(start, end);
  return addDays(start, dayCount - 1);
}

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
  
  const isSingleDay = isSameDayOrOvernight(startDate, endDate)
  
  const numberOfDays = getEventDayCount(startDate, endDate)
  const effectiveEndDate = getEffectiveEndDate(startDate, endDate)
  
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
    const startMonth = format(startDate, "MMMM")
    const endMonth = format(effectiveEndDate, "MMMM")
    const startDay = format(startDate, "dd")
    const endDay = format(effectiveEndDate, "dd")
    const year = format(effectiveEndDate, "yyyy")
    
    if (startMonth === endMonth) {
      dateDisplay = `${startMonth} ${startDay} - ${endDay}, ${year}`
    } else {
      dateDisplay = `${format(startDate, "MMMM dd")} - ${format(effectiveEndDate, "MMMM dd")}, ${year}`
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
