import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useDashboardStats, useTrainingStats, useAllEmployees, useEmployeeStats } from '../hooks/useApi'
import EmployeeModal from '../components/EmployeeModal'
import { 
  BarChart3, 
  Users, 
  GraduationCap, 
  Award, 
  TrendingUp, 
  Calendar,
  Clock,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Search,
  Eye,
  Filter,
  User,
  Shield,
  BookOpen,
  FileText,
  Globe,
  ChevronDown,
  ChevronRight
} from 'lucide-react'
import { useLayout } from '../contexts/LayoutContext'

const Analytics: React.FC = () => {
  const { user } = useAuth()
  const [selectedTab, setSelectedTab] = useState<'overview' | 'employees'>('overview')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null)
  const [expandedCountries, setExpandedCountries] = useState<Set<string>>(new Set())
  
  const { data: dashboardStats, isLoading: statsLoading } = useDashboardStats(user?.id || '')
  const { data: trainingStats, isLoading: trainingStatsLoading } = useTrainingStats()
  const { data: employees, isLoading: employeesLoading } = useAllEmployees()
  const { data: selectedEmployeeStats } = useEmployeeStats(selectedEmployee || '')
  const { theme } = useLayout()

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
                Sie haben keine Berechtigung, diese Seite zu sehen.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const isLoading = statsLoading || trainingStatsLoading || employeesLoading

  // Group employees by country
  const employeesByCountry = employees?.reduce((acc, employee) => {
    const country = employee.country
    if (!acc[country]) {
      acc[country] = []
    }
    acc[country].push(employee)
    return acc
  }, {} as Record<string, typeof employees>) || {}

  const filteredEmployeesByCountry = Object.entries(employeesByCountry).reduce((acc, [country, countryEmployees]) => {
    const filteredEmployees = countryEmployees?.filter(employee => 
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchQuery.toLowerCase())
    ) || []
    
    if (filteredEmployees.length > 0) {
      acc[country] = filteredEmployees
    }
    
    return acc
  }, {} as Record<string, typeof employees>)

  const getStatusColor = (completionRate: number) => {
    if (completionRate >= 80) return 'text-green-600 bg-green-100'
    if (completionRate >= 60) return 'text-yellow-600 bg-yellow-100'
    return 'text-red-600 bg-red-100'
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'manager':
        return <Shield className="h-4 w-4 text-blue-600" />
      case 'employee':
        return <User className="h-4 w-4 text-gray-600" />
      default:
        return <User className="h-4 w-4 text-gray-600" />
    }
  }

  const toggleCountryExpansion = (country: string) => {
    const newExpanded = new Set(expandedCountries)
    if (newExpanded.has(country)) {
      newExpanded.delete(country)
    } else {
      newExpanded.add(country)
    }
    setExpandedCountries(newExpanded)
  }

  const getCountryFlag = (country: string) => {
    const flags: Record<string, string> = {
      'Germany': '🇩🇪',
      'Austria': '🇦🇹',
      'Switzerland': '🇨🇭',
      'Netherlands': '🇳🇱',
      'Belgium': '🇧🇪'
    }
    return flags[country] || '🌍'
  }

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-1/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">LMS Analytics</h1>
        <p className="text-gray-600">
          Übersicht über Schulungsaktivitäten und Mitarbeiter-Überwachung
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setSelectedTab('overview')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                selectedTab === 'overview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Übersicht
            </button>
            <button
              onClick={() => setSelectedTab('employees')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                selectedTab === 'employees'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Mitarbeiter
            </button>
          </nav>
        </div>
      </div>

      {selectedTab === 'overview' ? (
        // Overview Tab Content
        <>
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Aktive Teilnehmer</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {dashboardStats?.activeTrainings || 0}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <GraduationCap className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Abgeschlossene Schulungen</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {dashboardStats?.completedTrainings || 0}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Award className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Zertifikate</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {dashboardStats?.totalCertificates || 0}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Ausstehende Genehmigungen</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {dashboardStats?.pendingApprovals || 0}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Schulungen nach Kategorie */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Schulungen nach Kategorie
              </h3>
              <div className="space-y-4">
                {trainingStats?.categoryStats?.map((category) => (
                  <div key={category.name} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">{category.name}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${(category.count / trainingStats.total) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600 w-8">{category.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Teilnahme-Statistiken */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Teilnahme-Statistiken
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span className="text-sm font-medium text-green-800">Genehmigt</span>
                  </div>
                  <span className="text-sm font-bold text-green-800">
                    {trainingStats?.approvalStats?.approved || 0}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-yellow-600 mr-2" />
                    <span className="text-sm font-medium text-yellow-800">Ausstehend</span>
                  </div>
                  <span className="text-sm font-bold text-yellow-800">
                    {trainingStats?.approvalStats?.pending || 0}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div className="flex items-center">
                    <XCircle className="h-5 w-5 text-red-600 mr-2" />
                    <span className="text-sm font-medium text-red-800">Abgelehnt</span>
                  </div>
                  <span className="text-sm font-bold text-red-800">
                    {trainingStats?.approvalStats?.rejected || 0}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Kosten-Übersicht */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Kosten-Übersicht
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <DollarSign className="h-8 w-8 text-green-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  €{trainingStats?.costStats?.totalSpent?.toLocaleString() || '0'}
                </p>
                <p className="text-sm text-gray-600">Gesamtausgaben</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Calendar className="h-8 w-8 text-blue-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  €{trainingStats?.costStats?.averagePerTraining?.toLocaleString() || '0'}
                </p>
                <p className="text-sm text-gray-600">Durchschnitt pro Schulung</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  €{trainingStats?.costStats?.averagePerParticipant?.toLocaleString() || '0'}
                </p>
                <p className="text-sm text-gray-600">Durchschnitt pro Teilnehmer</p>
              </div>
            </div>
          </div>

          {/* Top Schulungen */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Beliebteste Schulungen
            </h3>
            <div className="space-y-4">
              {trainingStats?.topTrainings?.map((training, index) => (
                <div key={training.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-sm font-bold text-blue-600">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{training.title}</p>
                      <p className="text-sm text-gray-600">{training.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{training.participantCount} Teilnehmer</p>
                    <p className="text-sm text-gray-600">{training.completionRate}% Abschlussrate</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        // Employees Tab Content
        <div className="space-y-6">
          {/* Search and Filter */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Mitarbeiter suchen..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="h-4 w-4 text-gray-400" />
                <span className="text-gray-500">
                  {Object.values(filteredEmployeesByCountry).flat().length} Mitarbeiter
                </span>
              </div>
            </div>
          </div>

          {/* Countries List */}
          <div className="space-y-4">
            {Object.entries(filteredEmployeesByCountry).map(([country, countryEmployees]) => (
              <div key={country} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <button
                  onClick={() => toggleCountryExpansion(country)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{getCountryFlag(country)}</span>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{country}</h3>
                      <p className="text-gray-500">{countryEmployees?.length || 0} Mitarbeiter</p>
                    </div>
                  </div>
                  {expandedCountries.has(country) ? (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  )}
                </button>
                
                {expandedCountries.has(country) && (
                  <div className="border-t border-gray-200">
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Mitarbeiter
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Abteilung
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Schulungen
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Zertifikate
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Abschlussrate
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Aktionen
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {countryEmployees?.map((employee) => {
                            const stats = selectedEmployeeStats && selectedEmployee === employee.id ? selectedEmployeeStats : null
                            return (
                              <tr key={employee.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <div className="flex-shrink-0 h-10 w-10">
                                      {employee.avatar ? (
                                        <img className="h-10 w-10 rounded-full" src={employee.avatar} alt="" />
                                      ) : (
                                        <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                                          {getRoleIcon(employee.role)}
                                        </div>
                                      )}
                                    </div>
                                    <div className="ml-4">
                                      <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                                      <div className="text-sm text-gray-500">{employee.email}</div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">{employee.department}</div>
                                  <div className="text-sm text-gray-500">{employee.position}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">
                                    {stats ? `${stats.completedTrainings}/${stats.totalTrainings}` : '-'}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {stats ? `${stats.activeTrainings} aktiv` : '-'}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">
                                    {stats ? stats.certificates : '-'}
                                  </div>
                                  {stats && stats.expiringCertificates > 0 && (
                                    <div className="text-sm text-red-500">
                                      {stats.expiringCertificates} läuft ab
                                    </div>
                                  )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  {stats ? (
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(stats.completionRate)}`}>
                                      {stats.completionRate}%
                                    </span>
                                  ) : (
                                    <span className="text-sm text-gray-500">-</span>
                                  )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center space-x-2">
                                    {stats && stats.pendingApprovals > 0 && (
                                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                        {stats.pendingApprovals} ausstehend
                                      </span>
                                    )}
                                    {stats && stats.expiringCertificates > 0 && (
                                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                        Zertifikat läuft ab
                                      </span>
                                    )}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                  <button
                                    onClick={() => setSelectedEmployee(employee.id)}
                                    className="text-blue-600 hover:text-blue-900 flex items-center space-x-1"
                                  >
                                    <Eye className="h-4 w-4" />
                                    <span>Details</span>
                                  </button>
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Employee Modal */}
      {selectedEmployee && selectedEmployeeStats && (
        <EmployeeModal
          employee={employees?.find(e => e.id === selectedEmployee) || null}
          employeeStats={selectedEmployeeStats}
          onClose={() => setSelectedEmployee(null)}
        />
      )}
    </div>
  )
}

export default Analytics 