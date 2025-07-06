import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { 
  User,
  Globe,
  Cookie,
  ChevronDown
} from 'lucide-react'
import { useLayout } from '../contexts/LayoutContext'

interface UserSettings {
  displayName: string
  email: string
  department: string
  position: string
  language: 'de' | 'en' | 'fr'
}

const Settings: React.FC = () => {
  const { user } = useAuth()
  const { theme, setTheme } = useLayout()
  const [isSaving, setIsSaving] = useState(false)
  const [settings, setSettings] = useState<UserSettings>({
    displayName: user?.name || '',
    email: user?.email || '',
    department: user?.department || '',
    position: user?.position || '',
    language: 'de',
  })
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false)

  const handleSettingChange = (key: keyof UserSettings, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleThemeChange = (newTheme: 'blue' | 'red') => {
    setTheme(newTheme)
    setThemeDropdownOpen(false)
  }

  const themeOptions = [
    { value: 'blue', label: 'Klassisch (Blau)', description: 'Ursprüngliches Design', color: 'bg-blue-600' },
    { value: 'red', label: 'TIP Group (Rot)', description: 'Neues Firmen-Design', color: 'bg-red-600' }
  ]

  const getCurrentThemeOption = () => {
    return themeOptions.find(option => option.value === theme) || themeOptions[0]
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Einstellungen</h1>
        <p className="text-gray-600 mt-2">Verwalten Sie Ihre persönlichen Einstellungen und Präferenzen.</p>
      </div>

      <div className="max-w-4xl space-y-8">
        {/* Profil-Einstellungen (nur anzeigen, nicht editierbar) */}
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="flex items-center mb-6">
            <User className="h-5 w-5 text-blue-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">Profil-Einstellungen</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Anzeigename</label>
              <input
                type="text"
                value={settings.displayName || '—'}
                disabled
                readOnly
                className="w-full px-3 py-2 rounded-md bg-gray-50 border border-gray-300 text-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">E-Mail</label>
              <input
                type="email"
                value={settings.email || '—'}
                disabled
                readOnly
                className="w-full px-3 py-2 rounded-md bg-gray-50 border border-gray-300 text-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Abteilung</label>
              <input
                type="text"
                value={settings.department || '—'}
                disabled
                readOnly
                className="w-full px-3 py-2 rounded-md bg-gray-50 border border-gray-300 text-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Position</label>
              <input
                type="text"
                value={settings.position || '—'}
                disabled
                readOnly
                className="w-full px-3 py-2 rounded-md bg-gray-50 border border-gray-300 text-gray-900"
              />
            </div>
          </div>
        </div>

        {/* Darstellung */}
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="flex items-center mb-6">
            <Globe className="h-5 w-5 text-purple-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">Darstellung</h2>
          </div>
          <div className="space-y-6">
            {/* Theme Selection */}
            <div>
              <label className="block text-sm font-medium mb-3 text-gray-700">Design Theme</label>
              <div className="relative">
                <button
                  onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
                  className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  aria-label="Theme auswählen"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 ${getCurrentThemeOption().color} rounded`}></div>
                    <div className="text-left">
                      <div className="font-medium text-gray-900">{getCurrentThemeOption().label}</div>
                      <div className="text-sm text-gray-500">{getCurrentThemeOption().description}</div>
                    </div>
                  </div>
                  <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${themeDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {themeDropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
                    {themeOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleThemeChange(option.value as 'blue' | 'red')}
                        className="w-full flex items-center space-x-3 px-3 py-2 hover:bg-gray-50 text-left"
                        aria-label={`${option.label} auswählen`}
                      >
                        <div className={`w-4 h-4 ${option.color} rounded`}></div>
                        <div>
                          <div className="font-medium text-gray-900">{option.label}</div>
                          <div className="text-sm text-gray-500">{option.description}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            {/* Language Selection */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Sprache</label>
              <select
                value={settings.language}
                onChange={(e) => handleSettingChange('language', e.target.value)}
                className="w-full px-3 py-2 rounded-md bg-white border border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                aria-label="Sprache auswählen"
              >
                <option value="de">Deutsch</option>
                <option value="en">English</option>
                <option value="fr">Français</option>
              </select>
            </div>
          </div>
        </div>

        {/* Cookies & Datenschutz */}
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="flex items-center mb-4">
            <Cookie className="h-5 w-5 text-yellow-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">Cookies & Datenschutz</h2>
          </div>
          <p className="text-gray-700">
            Diese Anwendung verwendet Cookies ausschließlich für die technische Funktionalität und zur Verbesserung des Nutzererlebnisses. Es werden keine Tracking- oder Werbe-Cookies eingesetzt.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Settings 