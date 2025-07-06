import { useState, useEffect } from 'react'
import { useUpcomingTrainings } from '../hooks/useApi'
import { Training } from '../mocks/data'
import { CalendarHeader, CalendarGrid, CalendarLegend, CalendarSkeleton } from './calendar'

interface TrainingCalendarProps {
  userId?: string
}

interface CalendarDay {
  date: Date
  isCurrentMonth: boolean
  isToday: boolean
  trainings: Training[]
}

const TrainingCalendar: React.FC<TrainingCalendarProps> = ({ userId }) => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [calendarDays, setCalendarDays] = useState<CalendarDay[]>([])
  
  const { data: trainings, isLoading } = useUpcomingTrainings(userId || '')

  // Generate calendar days for current month
  const generateCalendarDays = (date: Date, trainings: Training[] = []): CalendarDay[] => {
    const year = date.getFullYear()
    const month = date.getMonth()
    
    // First day of the month
    const firstDay = new Date(year, month, 1)
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0)
    
    // Start of calendar (previous month days to fill first week)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())
    
    const days: CalendarDay[] = []
    const today = new Date()
    
    // Generate 42 days (6 weeks)
    for (let i = 0; i < 42; i++) {
      const currentDate = new Date(startDate)
      currentDate.setDate(startDate.getDate() + i)
      
      // Find trainings for this date
      const dayTrainings = trainings.filter(training => {
        const trainingDate = new Date(training.date)
        return trainingDate.toDateString() === currentDate.toDateString()
      })
      
      days.push({
        date: currentDate,
        isCurrentMonth: currentDate.getMonth() === month,
        isToday: currentDate.toDateString() === today.toDateString(),
        trainings: dayTrainings
      })
    }
    
    return days
  }

  useEffect(() => {
    setCalendarDays(generateCalendarDays(currentDate, trainings || []))
  }, [currentDate, trainings])

  const goToPreviousMonth = () => {
    setCurrentDate(prev => {
      const newDate = new Date(prev)
      newDate.setMonth(prev.getMonth() - 1)
      return newDate
    })
  }

  const goToNextMonth = () => {
    setCurrentDate(prev => {
      const newDate = new Date(prev)
      newDate.setMonth(prev.getMonth() + 1)
      return newDate
    })
  }

    const goToToday = () => {
    setCurrentDate(new Date())
  }

  if (isLoading) {
    return <CalendarSkeleton />
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <CalendarHeader
        currentDate={currentDate}
        onPreviousMonth={goToPreviousMonth}
        onNextMonth={goToNextMonth}
        onGoToToday={goToToday}
      />
      
      <CalendarGrid calendarDays={calendarDays} />
      
      <CalendarLegend />
    </div>
  )
}

export default TrainingCalendar 