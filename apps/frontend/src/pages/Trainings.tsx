import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { BookOpen, Calendar, MapPin, Users, Clock, CheckCircle, Search, Filter, Star } from 'lucide-react'
import { useTrainings, useCategories, useRegisterForTraining, useCurrentUser } from '../hooks/useApi'
import { toast } from 'react-hot-toast'
import { mockApi } from '../services/mockApi'

const Trainings: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [statusFilter, setStatusFilter] = useState<string>('')
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false)
  const [feedbackTrainingId, setFeedbackTrainingId] = useState<string | null>(null)
  const [feedbackRating, setFeedbackRating] = useState(0)
  const [feedbackComment, setFeedbackComment] = useState('')
  const [feedbackSubmitting, setFeedbackSubmitting] = useState(false)
  const [feedbackGiven, setFeedbackGiven] = useState<{[trainingId: string]: boolean}>({})
  
  const currentUserId = '1' // Mock user ID
  
  const { data: trainings, isLoading: trainingsLoading } = useTrainings({ category: selectedCategory })
  const { data: categories, isLoading: categoriesLoading } = useCategories()
  const { data: currentUser } = useCurrentUser()
  const registerMutation = useRegisterForTraining()

  const isLoading = trainingsLoading || categoriesLoading

  // Handle URL parameters on component mount
  useEffect(() => {
    const filterParam = searchParams.get('filter')
    if (filterParam) {
      setStatusFilter(filterParam)
      // Clear the URL parameter after reading it
      searchParams.delete('filter')
      setSearchParams(searchParams)
    }
  }, [searchParams, setSearchParams])

  const handleRegister = async (trainingId: string) => {
    if (!currentUser) {
      toast.error('Bitte melden Sie sich an, um sich für Schulungen anzumelden.')
      return
    }

    try {
      await registerMutation.mutateAsync({
        userId: currentUserId,
        trainingId,
        comments: 'Interesse an der Schulung'
      })
    } catch (error) {
      console.error('Registration error:', error)
    }
  }

  const handleOpenFeedback = (trainingId: string) => {
    setFeedbackTrainingId(trainingId)
    setFeedbackModalOpen(true)
    setFeedbackRating(0)
    setFeedbackComment('')
  }

  const handleSubmitFeedback = async () => {
    if (!feedbackTrainingId || feedbackRating === 0) return
    setFeedbackSubmitting(true)
    try {
      await mockApi.addFeedbackForTraining(feedbackTrainingId, currentUserId, feedbackRating, feedbackComment)
      setFeedbackGiven(prev => ({ ...prev, [feedbackTrainingId]: true }))
      setFeedbackModalOpen(false)
      toast.success('Feedback gespeichert!')
    } catch (e) {
      toast.error('Fehler beim Speichern des Feedbacks')
    } finally {
      setFeedbackSubmitting(false)
    }
  }

  const getFilteredTrainings = () => {
    if (!trainings) return []

    let filtered = trainings.filter(training => {
      const matchesCategory = selectedCategory === 'all' || training.category === selectedCategory
      const matchesSearch = searchQuery === '' || 
        training.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        training.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        training.provider.toLowerCase().includes(searchQuery.toLowerCase())
      
      return matchesCategory && matchesSearch
    })

    // Apply status filter based on dashboard filter
    if (statusFilter) {
      switch (statusFilter) {
        case 'active':
          // Show trainings that are available or where user is registered
          filtered = filtered.filter(training => training.status === 'available' || training.status === 'registered')
          break
        case 'pending':
          // Show trainings where user has pending registrations (status 'registered' in this mock)
          filtered = filtered.filter(training => training.status === 'registered')
          break
        case 'completed':
          // Show completed trainings
          filtered = filtered.filter(training => training.status === 'completed')
          break
        case 'expiring':
          // For expiring certificates, show available trainings that might help renew certificates
          filtered = filtered.filter(training => training.status === 'available')
          break
        default:
          break
      }
    }

    return filtered
  }

  const filteredTrainings = getFilteredTrainings()

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'available':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Verfügbar
          </span>
        )
      case 'full':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            Ausgebucht
          </span>
        )
      case 'registered':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            Angemeldet
          </span>
        )
      case 'completed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            Abgeschlossen
          </span>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h1 className="text-2xl font-bold text-gray-900">Verfügbare Schulungen</h1>
          <p className="mt-1 text-sm text-gray-500">
            Entdecken Sie unsere externen Schulungsangebote und melden Sie sich an.
          </p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          {/* Active Filter Display */}
          {statusFilter && (
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Filter className="h-4 w-4 text-blue-500 mr-2" />
                  <span className="text-sm font-medium text-gray-700">
                    Filter: {
                      statusFilter === 'active' ? 'Aktive Schulungen' :
                      statusFilter === 'pending' ? 'Ausstehende Genehmigungen' :
                      statusFilter === 'completed' ? 'Abgeschlossene Schulungen' :
                      statusFilter === 'expiring' ? 'Überfällige Zertifikate' :
                      statusFilter
                    }
                  </span>
                </div>
                <button
                  onClick={() => setStatusFilter('')}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Filter entfernen
                </button>
              </div>
            </div>
          )}

          {/* Search */}
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Schulungen suchen..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories?.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  selectedCategory === category.id
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white shadow rounded-lg">
              <div className="p-6">
                <div className="animate-pulse">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                  </div>
                  <div className="mt-4 h-10 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Trainings Grid */}
      {!isLoading && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {filteredTrainings.map((training) => (
            <div key={training.id} className="bg-white shadow rounded-lg">
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900">{training.title}</h3>
                    <p className="mt-1 text-sm text-gray-500">{training.description}</p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {training.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  {getStatusBadge(training.status)}
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-2" />
                    {new Date(training.date).toLocaleDateString('de-DE')} • {training.duration}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-2" />
                    {training.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="h-4 w-4 mr-2" />
                    {training.currentParticipants}/{training.maxParticipants} Teilnehmer
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <BookOpen className="h-4 w-4 mr-2" />
                    {training.provider} • {training.price}€
                  </div>
                </div>

                <div className="mt-4">
                  {training.status === 'available' && (
                    <button 
                      onClick={() => handleRegister(training.id)}
                      disabled={registerMutation.isPending}
                      className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {registerMutation.isPending ? 'Wird angemeldet...' : 'Anmelden'}
                    </button>
                  )}
                  {training.status === 'registered' && (
                    <div className="flex items-center justify-center text-sm text-blue-600">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Angemeldet - Warten auf Genehmigung
                    </div>
                  )}
                  {training.status === 'full' && (
                    <div className="flex items-center justify-center text-sm text-red-600">
                      <Clock className="h-4 w-4 mr-2" />
                      Ausgebucht
                    </div>
                  )}
                  {training.status === 'completed' && !feedbackGiven[training.id] && (
                    <button
                      onClick={() => handleOpenFeedback(training.id)}
                      className="w-full bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 mt-2"
                    >
                      Feedback geben
                    </button>
                  )}
                  {training.status === 'completed' && feedbackGiven[training.id] && (
                    <div className="flex items-center justify-center text-sm text-green-600 mt-2">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Feedback abgegeben
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && filteredTrainings.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Keine Schulungen gefunden</h3>
          <p className="mt-1 text-sm text-gray-500">
            Versuchen Sie andere Suchkriterien oder Kategorien.
          </p>
        </div>
      )}

      {/* Feedback Modal */}
      {feedbackModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold mb-4">Feedback zur Schulung</h3>
            <div className="flex items-center mb-4">
              {[1,2,3,4,5].map(star => (
                <button
                  key={star}
                  onClick={() => setFeedbackRating(star)}
                  className="focus:outline-none"
                  title={`${star} Stern${star > 1 ? 'e' : ''}`}
                >
                  <Star className={`h-7 w-7 ${feedbackRating >= star ? 'text-yellow-400' : 'text-gray-300'}`} fill={feedbackRating >= star ? '#facc15' : 'none'} />
                </button>
              ))}
            </div>
            <textarea
              className="w-full border border-gray-300 rounded-md p-2 mb-4"
              rows={3}
              placeholder="Ihr Kommentar (optional)"
              value={feedbackComment}
              onChange={e => setFeedbackComment(e.target.value)}
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setFeedbackModalOpen(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md"
                disabled={feedbackSubmitting}
              >
                Abbrechen
              </button>
              <button
                onClick={handleSubmitFeedback}
                className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 disabled:opacity-50"
                disabled={feedbackSubmitting || feedbackRating === 0}
              >
                {feedbackSubmitting ? 'Speichern...' : 'Feedback speichern'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Trainings 