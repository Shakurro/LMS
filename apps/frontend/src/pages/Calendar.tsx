import { useAuth } from '../contexts/AuthContext'
import TrainingCalendar from '../components/TrainingCalendar'

const Calendar: React.FC = () => {
  const { user } = useAuth()

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-gray-900">Schulungskalender</h1>
        <p className="text-gray-600">
          Übersicht über Ihre genehmigten Schulungen
        </p>
      </div>
      <div className="bg-white rounded-lg p-4">
        <TrainingCalendar userId={user?.id} />
      </div>
    </div>
  )
}

export default Calendar 