import { User } from 'lucide-react'

interface ProfileSettingsProps {
  settings: {
    displayName: string
    email: string
    department: string
    position: string
  }
  onSettingChange: (key: string, value: any) => void
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({ settings, onSettingChange }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center mb-6">
        <User className="h-5 w-5 text-blue-600 mr-2" />
        <h2 className="text-xl font-semibold text-gray-900">Profil-Einstellungen</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Anzeigename
          </label>
          <input
            type="text"
            value={settings.displayName}
            onChange={(e) => onSettingChange('displayName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Anzeigename eingeben"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            E-Mail
          </label>
          <input
            type="email"
            value={settings.email}
            onChange={(e) => onSettingChange('email', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="E-Mail-Adresse eingeben"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Abteilung
          </label>
          <input
            type="text"
            value={settings.department}
            onChange={(e) => onSettingChange('department', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Abteilung eingeben"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Position
          </label>
          <input
            type="text"
            value={settings.position}
            onChange={(e) => onSettingChange('position', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Position eingeben"
          />
        </div>
      </div>
    </div>
  )
}

export default ProfileSettings 