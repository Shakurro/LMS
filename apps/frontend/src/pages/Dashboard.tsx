import { useMsal } from '@azure/msal-react'
import { useNavigate } from 'react-router-dom'
import { BookOpen, Clock, CheckCircle, AlertCircle, TrendingUp, Calendar } from 'lucide-react'
import { useCurrentUser, useDashboardStats, useUpcomingTrainings, useUserNotifications } from '../hooks/useApi'

const Dashboard: React.FC = () => {
  const { accounts } = useMsal()
  const navigate = useNavigate()
  const account = accounts[0]
  
  // Mock user ID (in echten App würde das aus dem Token kommen)
  const currentUserId = '1'
  
  const { data: user, isLoading: userLoading } = useCurrentUser()
  const { data: stats, isLoading: statsLoading } = useDashboardStats(currentUserId)
  const { data: upcomingTrainings, isLoading: trainingsLoading } = useUpcomingTrainings(currentUserId)
  const { data: notifications, isLoading: notificationsLoading } = useUserNotifications(currentUserId)

  const isLoading = userLoading || statsLoading || trainingsLoading || notificationsLoading

  const handleStatCardClick = (filterType: string) => {
    navigate(`/trainings?filter=${filterType}`)
  }

  const statsData = [
    { 
      name: 'Aktive Schulungen', 
      value: stats?.activeTrainings?.toString() || '0', 
      icon: BookOpen, 
      color: 'text-blue-600',
      filterType: 'active'
    },
    { 
      name: 'Ausstehende Genehmigungen', 
      value: stats?.pendingApprovals?.toString() || '0', 
      icon: Clock, 
      color: 'text-yellow-600',
      filterType: 'pending'
    },
    { 
      name: 'Abgeschlossene Schulungen', 
      value: stats?.completedTrainings?.toString() || '0', 
      icon: CheckCircle, 
      color: 'text-green-600',
      filterType: 'completed'
    },
    { 
      name: 'Überfällige Zertifikate', 
      value: stats?.expiringCertificates?.toString() || '0', 
      icon: AlertCircle, 
      color: 'text-red-600',
      filterType: 'expiring'
    },
  ]

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="animate-pulse">
                  <div className="h-6 w-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-1"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Willkommen, {user?.name || account?.name || 'Benutzer'}!
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Hier finden Sie eine Übersicht über Ihre Schulungen und deren Status.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {statsData.map((item) => {
          const Icon = item.icon
          return (
            <div 
              key={item.name} 
              className="bg-white overflow-hidden shadow rounded-lg cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-200 group"
              onClick={() => handleStatCardClick(item.filterType)}
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Icon className={`h-6 w-6 ${item.color}`} />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {item.name}
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">{item.value}</dd>
                    </dl>
                    <div className="mt-1">
                      <span className="text-xs text-gray-400 group-hover:text-blue-500 transition-colors">
                        Klicken für Details →
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Upcoming Trainings */}
      {upcomingTrainings && upcomingTrainings.length > 0 && (
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Anstehende Schulungen
              </h3>
              <button
                onClick={() => navigate('/trainings?filter=active')}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                Alle anzeigen →
              </button>
            </div>
            <div className="mt-5">
              <div className="space-y-4">
                {upcomingTrainings.slice(0, 3).map((training) => (
                  <div key={training.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-blue-500 mr-3" />
                      <div>
                        <p className="font-medium text-gray-900">{training.title}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(training.date).toLocaleDateString('de-DE')} • {training.location}
                        </p>
                      </div>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Genehmigt
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recent Notifications */}
      {notifications && notifications.length > 0 && (
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Letzte Benachrichtigungen
            </h3>
            <div className="mt-5">
              <div className="flow-root">
                <ul className="-mb-8">
                  {notifications.slice(0, 3).map((notification, index) => (
                    <li key={notification.id}>
                      <div className={`relative ${index < notifications.length - 1 ? 'pb-8' : ''}`}>
                        <div className="relative flex space-x-3">
                          <div>
                            <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${
                              notification.type === 'approval' ? 'bg-green-500' :
                              notification.type === 'registration' ? 'bg-blue-500' :
                              notification.type === 'reminder' ? 'bg-yellow-500' :
                              'bg-gray-500'
                            }`}>
                              {notification.type === 'approval' ? (
                                <CheckCircle className="h-5 w-5 text-white" />
                              ) : notification.type === 'registration' ? (
                                <BookOpen className="h-5 w-5 text-white" />
                              ) : notification.type === 'reminder' ? (
                                <Clock className="h-5 w-5 text-white" />
                              ) : (
                                <AlertCircle className="h-5 w-5 text-white" />
                              )}
                            </span>
                          </div>
                          <div className="min-w-0 flex-1 pt-1.5">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                              <p className="text-sm text-gray-700 break-words">{notification.message}</p>
                              <span className="text-xs text-gray-400 mt-1 sm:mt-0 sm:ml-4 whitespace-nowrap">
                                <time>{new Date(notification.date).toLocaleDateString('de-DE')}</time>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard 