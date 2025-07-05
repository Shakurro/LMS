import { useMsal } from '@azure/msal-react'
import { User, Mail, Building, Award, Upload, Download, Calendar, FileText } from 'lucide-react'
import { useCurrentUser, useUserCertificates, useUserRegistrations } from '../hooks/useApi'
import { useState } from 'react'

const Profile: React.FC = () => {
  const { accounts } = useMsal()
  const account = accounts[0]
  
  const currentUserId = '1' // Mock user ID
  
  const { data: user, isLoading: userLoading } = useCurrentUser()
  const { data: certificates, isLoading: certificatesLoading } = useUserCertificates(currentUserId)
  const { data: registrations, isLoading: registrationsLoading } = useUserRegistrations(currentUserId)
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const isLoading = userLoading || certificatesLoading || registrationsLoading

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'valid':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Gültig
          </span>
        )
      case 'expired':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            Abgelaufen
          </span>
        )
      case 'expiring':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            Läuft bald ab
          </span>
        )
      default:
        return null
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="animate-pulse">
              <div className="flex items-center">
                <div className="h-16 w-16 rounded-full bg-gray-200"></div>
                <div className="ml-6">
                  <div className="h-8 bg-gray-200 rounded w-48 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-32 mb-1"></div>
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* User Info */}
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              {user?.avatar ? (
                <img 
                  src={user.avatar} 
                  alt={user.name}
                  className="h-16 w-16 rounded-full object-cover"
                />
              ) : (
                <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
                  <User className="h-8 w-8 text-blue-600" />
                </div>
              )}
            </div>
            <div className="ml-6">
              <h1 className="text-2xl font-bold text-gray-900">{user?.name || account?.name || 'Benutzer'}</h1>
              <div className="mt-2 space-y-1">
                <div className="flex items-center text-sm text-gray-500">
                  <Mail className="h-4 w-4 mr-2" />
                  {user?.email || account?.username || 'benutzer@example.com'}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Building className="h-4 w-4 mr-2" />
                  {user?.department || 'IT-Abteilung'}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <User className="h-4 w-4 mr-2" />
                  {user?.position || 'Entwickler'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Certificates Section */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Meine Zertifikate
            </h3>
            <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <Upload className="h-4 w-4 mr-2" />
              Zertifikat hochladen
            </button>
          </div>

          <div className="mt-6">
            {certificates?.length === 0 ? (
              <div className="text-center py-12">
                <Award className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">Keine Zertifikate</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Sie haben noch keine Zertifikate hochgeladen.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {certificates?.map((certificate) => (
                  <div
                    key={certificate.id}
                    className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900">
                          {certificate.title}
                        </h4>
                        <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            Ausgestellt: {new Date(certificate.issueDate).toLocaleDateString('de-DE')}
                          </span>
                          {certificate.expiryDate && (
                            <span className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              Gültig bis: {new Date(certificate.expiryDate).toLocaleDateString('de-DE')}
                            </span>
                          )}
                        </div>
                        {certificate.certificateNumber && (
                          <div className="mt-1 text-sm text-gray-500">
                            <span className="flex items-center">
                              <FileText className="h-4 w-4 mr-1" />
                              Zertifikat-Nr.: {certificate.certificateNumber}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(certificate.workdayStatus)}
                        {certificate.fileUrl && (
                          <button 
                            className="inline-flex items-center p-1 border border-transparent rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            title="Zertifikat herunterladen"
                          >
                            <Download className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Workday Integration Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <Building className="h-5 w-5 text-blue-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">Workday Integration</h3>
            <div className="mt-2 text-sm text-blue-700">
              <p>
                Ihre Zertifikate werden automatisch in Ihr Workday-Profil übertragen und sind dort für
                Manager und HR sichtbar.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile 