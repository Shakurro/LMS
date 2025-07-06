import { MapPin, Clock, CheckCircle } from 'lucide-react'
import { Training } from '../../mocks/data'

interface CalendarDay {
  date: Date
  isCurrentMonth: boolean
  isToday: boolean
  trainings: Training[]
}

interface CalendarGridProps {
  calendarDays: CalendarDay[]
}

const CalendarGrid: React.FC<CalendarGridProps> = ({ calendarDays }) => {
  const weekDays = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa']

  return (
    <div className="grid grid-cols-7 gap-1">
      {/* Week day headers */}
      {weekDays.map(day => (
        <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
          {day}
        </div>
      ))}
      
      {/* Calendar days */}
      {calendarDays.map((day, index) => (
        <div
          key={index}
          className={`min-h-[100px] p-2 border border-gray-100 ${
            day.isCurrentMonth 
              ? 'bg-white' 
              : 'bg-gray-50 text-gray-400'
          } ${
            day.isToday 
              ? 'ring-2 ring-blue-500 ring-inset' 
              : ''
          }`}
        >
          <div className="text-sm font-medium mb-1">
            {day.date.getDate()}
          </div>
          
          {/* Training events */}
          <div className="space-y-1">
            {day.trainings.slice(0, 2).map((training, trainingIndex) => (
              <div
                key={training.id}
                className="text-xs p-1 bg-green-100 text-green-800 rounded cursor-pointer hover:bg-green-200 transition-colors border border-green-200"
                title={`Genehmigt: ${training.title} - ${training.location} - ${training.duration}`}
              >
                <div className="font-medium truncate flex items-center">
                  <CheckCircle className="h-3 w-3 mr-1 flex-shrink-0" />
                  {training.title}
                </div>
                <div className="flex items-center text-green-700">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span className="truncate">{training.location}</span>
                </div>
                <div className="flex items-center text-green-700 mt-1">
                  <Clock className="h-3 w-3 mr-1" />
                  <span className="truncate">{training.duration}</span>
                </div>
              </div>
            ))}
            
            {day.trainings.length > 2 && (
              <div className="text-xs text-gray-500 text-center">
                +{day.trainings.length - 2} weitere
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default CalendarGrid 