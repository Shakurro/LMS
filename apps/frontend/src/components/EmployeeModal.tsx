import { X, BookOpen, FileText, TrendingUp, Calendar, MapPin, Users, Clock, CheckCircle, AlertTriangle } from 'lucide-react'
import { User, Training, Certificate } from '../mocks/data'

interface EmployeeModalProps {
  employee: User | null
  employeeStats: any
  onClose: () => void
}

const EmployeeModal: React.FC<EmployeeModalProps> = ({ employee, employeeStats, onClose }) => {
  if (!employee || !employeeStats) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            {employee.avatar ? (
              <img className="h-16 w-16 rounded-full" src={employee.avatar} alt="" />
            ) : (
              <div className="h-16 w-16 rounded-full bg-gray-300 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-600">
                  {employee.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
            )}
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{employee.name}</h2>
              <p className="text-gray-600">{employee.position} • {employee.department}</p>
              <p className="text-sm text-gray-500">{employee.email}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            title="Schließen"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center">
                <BookOpen className="h-5 w-5 text-blue-600 mr-2" />
                <span className="text-sm font-medium text-blue-800">Schulungen</span>
              </div>
              <p className="text-2xl font-bold text-blue-900 mt-1">
                {employeeStats.totalTrainings}
              </p>
              <p className="text-sm text-blue-600">
                {employeeStats.completedTrainings} abgeschlossen
              </p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center">
                <FileText className="h-5 w-5 text-green-600 mr-2" />
                <span className="text-sm font-medium text-green-800">Zertifikate</span>
              </div>
              <p className="text-2xl font-bold text-green-900 mt-1">
                {employeeStats.certificates}
              </p>
              {employeeStats.expiringCertificates > 0 && (
                <p className="text-sm text-red-600">
                  {employeeStats.expiringCertificates} läuft ab
                </p>
              )}
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center">
                <TrendingUp className="h-5 w-5 text-purple-600 mr-2" />
                <span className="text-sm font-medium text-purple-800">Abschlussrate</span>
              </div>
              <p className="text-2xl font-bold text-purple-900 mt-1">
                {employeeStats.completionRate}%
              </p>
              <p className="text-sm text-purple-600">
                {employeeStats.activeTrainings} aktiv
              </p>
            </div>
          </div>

          {/* Status Alerts */}
          {(employeeStats.pendingApprovals > 0 || employeeStats.expiringCertificates > 0) && (
            <div className="mb-6 space-y-3">
              {employeeStats.pendingApprovals > 0 && (
                <div className="flex items-center p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <Clock className="h-5 w-5 text-yellow-600 mr-3" />
                  <div>
                    <p className="font-medium text-yellow-800">
                      {employeeStats.pendingApprovals} ausstehende Genehmigung(en)
                    </p>
                    <p className="text-sm text-yellow-700">
                      Warten auf Manager- oder LMS-Genehmigung
                    </p>
                  </div>
                </div>
              )}
              
              {employeeStats.expiringCertificates > 0 && (
                <div className="flex items-center p-3 bg-red-50 border border-red-200 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-red-600 mr-3" />
                  <div>
                    <p className="font-medium text-red-800">
                      {employeeStats.expiringCertificates} Zertifikat(e) läuft/laufen ab
                    </p>
                    <p className="text-sm text-red-700">
                      Erneuerung oder neue Schulung erforderlich
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Upcoming Trainings */}
          {employeeStats.upcomingTrainings && employeeStats.upcomingTrainings.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Anstehende Schulungen
              </h3>
              <div className="space-y-3">
                {employeeStats.upcomingTrainings.map((training: Training) => (
                  <div key={training.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{training.title}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(training.date).toLocaleDateString('de-DE')}
                        </span>
                        <span className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {training.location}
                        </span>
                        <span className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {training.duration}
                        </span>
                      </div>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Genehmigt
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recent Certificates */}
          {employeeStats.recentCertificates && employeeStats.recentCertificates.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Letzte Zertifikate
              </h3>
              <div className="space-y-3">
                {employeeStats.recentCertificates.map((certificate: Certificate) => (
                  <div key={certificate.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{certificate.title}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                        <span>
                          Ausgestellt: {new Date(certificate.issueDate).toLocaleDateString('de-DE')}
                        </span>
                        {certificate.expiryDate && (
                          <span className={`flex items-center ${
                            new Date(certificate.expiryDate) < new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
                              ? 'text-red-600'
                              : ''
                          }`}>
                            <Clock className="h-4 w-4 mr-1" />
                            Läuft ab: {new Date(certificate.expiryDate).toLocaleDateString('de-DE')}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {certificate.issuer}
                      </span>
                      {certificate.certificateNumber && (
                        <p className="text-xs text-gray-500 mt-1">
                          #{certificate.certificateNumber}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default EmployeeModal 