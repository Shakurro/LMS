import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react'

interface CalendarHeaderProps {
  currentDate: Date
  onPreviousMonth: () => void
  onNextMonth: () => void
  onGoToToday: () => void
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentDate,
  onPreviousMonth,
  onNextMonth,
  onGoToToday
}) => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('de-DE', { 
      month: 'long', 
      year: 'numeric' 
    })
  }

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center space-x-4">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
          <Calendar className="h-5 w-5 mr-2" />
          Schulungskalender
        </h2>
        <button
          onClick={onGoToToday}
          className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Heute
        </button>
      </div>
      
      <div className="flex items-center space-x-2">
        <button
          onClick={onPreviousMonth}
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
          aria-label="Vorheriger Monat"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        
        <h3 className="text-lg font-medium text-gray-900 min-w-[200px] text-center">
          {formatDate(currentDate)}
        </h3>
        
        <button
          onClick={onNextMonth}
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
          aria-label="Nächster Monat"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

export default CalendarHeader 