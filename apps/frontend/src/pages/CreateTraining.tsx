import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { 
  Plus, 
  AlertTriangle, 
  Save, 
  X,
  Calendar,
  MapPin,
  Users,
  Euro,
  Tag,
  FileText,
  Target
} from 'lucide-react'

interface TrainingFormData {
  title: string;
  description: string;
  category: string;
  date: string;
  duration: string;
  location: string;
  country: string;
  maxParticipants: number;
  price: number;
  provider: string;
  tags: string[];
  requirements: string[];
  learningObjectives: string[];
}

const CreateTraining: React.FC = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<TrainingFormData>({
    title: '',
    description: '',
    category: '',
    date: '',
    duration: '',
    location: '',
    country: '',
    maxParticipants: 10,
    price: 0,
    provider: '',
    tags: [],
    requirements: [],
    learningObjectives: [],
  })

  const [newTag, setNewTag] = useState('')
  const [newRequirement, setNewRequirement] = useState('')
  const [newObjective, setNewObjective] = useState('')

  if (user?.role !== 'lms_manager') {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex">
            <AlertTriangle className="h-5 w-5 text-red-400" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Zugriff verweigert
              </h3>
              <p className="text-sm text-red-700 mt-1">
                Sie haben keine Berechtigung, neue Schulungen zu erstellen.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const categories = [
    'Elektrik',
    'Bremsen', 
    'Führerschein',
    'Sicherheit',
    'Wartung',
    'Spezial'
  ]

  const handleInputChange = (field: keyof TrainingFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      handleInputChange('tags', [...formData.tags, newTag.trim()])
      setNewTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    handleInputChange('tags', formData.tags.filter(tag => tag !== tagToRemove))
  }

  const addRequirement = () => {
    if (newRequirement.trim() && !formData.requirements.includes(newRequirement.trim())) {
      handleInputChange('requirements', [...formData.requirements, newRequirement.trim()])
      setNewRequirement('')
    }
  }

  const removeRequirement = (requirementToRemove: string) => {
    handleInputChange('requirements', formData.requirements.filter(req => req !== requirementToRemove))
  }

  const addObjective = () => {
    if (newObjective.trim() && !formData.learningObjectives.includes(newObjective.trim())) {
      handleInputChange('learningObjectives', [...formData.learningObjectives, newObjective.trim()])
      setNewObjective('')
    }
  }

  const removeObjective = (objectiveToRemove: string) => {
    handleInputChange('learningObjectives', formData.learningObjectives.filter(obj => obj !== objectiveToRemove))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simuliere API-Aufruf
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast.success('Schulung erfolgreich erstellt!')
      navigate('/trainings')
    } catch (error) {
      toast.error('Fehler beim Erstellen der Schulung')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Neue Schulung erstellen</h1>
        <p className="text-gray-600">
          Erstellen Sie eine neue Schulung für Ihre Mitarbeiter
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {/* Grundinformationen */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Grundinformationen</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Titel *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="z.B. Knorr-Bremsen Systeme"
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Kategorie *
                </label>
                <select
                  id="category"
                  required
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Kategorie auswählen"
                >
                  <option value="">Kategorie auswählen</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Anbieter *
                </label>
                <input
                  type="text"
                  required
                  value={formData.provider}
                  onChange={(e) => handleInputChange('provider', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="z.B. Knorr-Bremse AG"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preis (€) *
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Beschreibung *
              </label>
              <textarea
                required
                rows={4}
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Detaillierte Beschreibung der Schulung..."
              />
            </div>
          </div>

          {/* Termin & Ort */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Termin & Ort</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                  Datum *
                </label>
                <input
                  id="date"
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Datum auswählen"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dauer *
                </label>
                <input
                  type="text"
                  required
                  value={formData.duration}
                  onChange={(e) => handleInputChange('duration', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="z.B. 2 Tage"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ort *
                </label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="z.B. Schulungszentrum Bremen"
                />
              </div>

              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
                  Land *
                </label>
                <select
                  id="country"
                  required
                  value={formData.country}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Land auswählen"
                >
                  <option value="">Land auswählen</option>
                  <option value="Germany">Deutschland</option>
                  <option value="Austria">Österreich</option>
                  <option value="Switzerland">Schweiz</option>
                  <option value="France">Frankreich</option>
                  <option value="Italy">Italien</option>
                  <option value="Spain">Spanien</option>
                  <option value="Netherlands">Niederlande</option>
                  <option value="Belgium">Belgien</option>
                  <option value="Poland">Polen</option>
                  <option value="Czech Republic">Tschechische Republik</option>
                </select>
              </div>
            </div>
          </div>

          {/* Teilnehmer */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Teilnehmer</h2>
            
            <div>
              <label htmlFor="maxParticipants" className="block text-sm font-medium text-gray-700 mb-2">
                Maximale Teilnehmerzahl *
              </label>
              <input
                id="maxParticipants"
                type="number"
                required
                min="1"
                value={formData.maxParticipants}
                onChange={(e) => handleInputChange('maxParticipants', parseInt(e.target.value) || 1)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Maximale Teilnehmerzahl eingeben"
              />
            </div>
          </div>

          {/* Tags */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Tags</h2>
            
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Tag hinzufügen..."
              />
              <button
                type="button"
                onClick={addTag}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Tag hinzufügen"
                title="Tag hinzufügen"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {formData.tags.map(tag => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-2 text-blue-600 hover:text-blue-800"
                    aria-label={`Tag "${tag}" entfernen`}
                    title={`Tag "${tag}" entfernen`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Voraussetzungen */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Voraussetzungen</h2>
            
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={newRequirement}
                onChange={(e) => setNewRequirement(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addRequirement())}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Voraussetzung hinzufügen..."
              />
              <button
                type="button"
                onClick={addRequirement}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Voraussetzung hinzufügen"
                title="Voraussetzung hinzufügen"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <ul className="space-y-2">
              {formData.requirements.map(requirement => (
                <li key={requirement} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-700">{requirement}</span>
                  <button
                    type="button"
                    onClick={() => removeRequirement(requirement)}
                    className="text-red-600 hover:text-red-800"
                    aria-label={`Voraussetzung "${requirement}" entfernen`}
                    title={`Voraussetzung "${requirement}" entfernen`}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Lernziele */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Lernziele</h2>
            
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={newObjective}
                onChange={(e) => setNewObjective(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addObjective())}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Lernziel hinzufügen..."
              />
              <button
                type="button"
                onClick={addObjective}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Lernziel hinzufügen"
                title="Lernziel hinzufügen"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <ul className="space-y-2">
              {formData.learningObjectives.map(objective => (
                <li key={objective} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-700">{objective}</span>
                  <button
                    type="button"
                    onClick={() => removeObjective(objective)}
                    className="text-red-600 hover:text-red-800"
                    aria-label={`Lernziel "${objective}" entfernen`}
                    title={`Lernziel "${objective}" entfernen`}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Aktionen */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => navigate('/trainings')}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Abbrechen
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Erstelle...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Schulung erstellen
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default CreateTraining 