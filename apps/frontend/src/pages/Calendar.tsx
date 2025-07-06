import { useAuth } from '../contexts/AuthContext'
import TrainingCalendar from '../components/TrainingCalendar'

const Calendar: React.FC = () => {
  const { user } = useAuth()

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Schulungskalender</h1>
        <p className="text-gray-600">
          Übersicht über Ihre genehmigten Schulungen
        </p>
      </div>

      <TrainingCalendar userId={user?.id} />
    </div>
  )
}

export default Calendar 