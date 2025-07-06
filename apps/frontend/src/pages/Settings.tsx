import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { 
  Settings as SettingsIcon,
  User,
  Globe,
  Bell,
  Cookie,
  Save
} from 'lucide-react'
import { toast } from 'react-hot-toast'

interface UserSettings {
  displayName: string
  email: string
  department: string
  position: string
  theme: 'light' | 'dark' | 'system'
  language: 'de' | 'en'
  fontSize: 'small' | 'medium' | 'large'
  emailNotifications: boolean
  pushNotifications: boolean
  trainingReminders: boolean
  certificateExpiryAlerts: boolean
  essentialCookies: boolean
  analyticsCookies: boolean
  marketingCookies: boolean
}

const Settings: React.FC = () => {
  const { user } = useAuth()
  const [isSaving, setIsSaving] = useState(false)
  const [settings, setSettings] = useState<UserSettings>({
    displayName: user?.name || '',
    email: user?.email || '',
    department: user?.department || '',
    position: user?.position || '',
    theme: 'system',
    language: 'de',
    fontSize: 'medium',
    emailNotifications: true,
    pushNotifications: true,
    trainingReminders: true,
    certificateExpiryAlerts: true,
    essentialCookies: true,
    analyticsCookies: false,
    marketingCookies: false
  })

  const handleSettingChange = (key: keyof UserSettings, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleSaveSettings = async () => {
    setIsSaving(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success('Einstellungen erfolgreich gespeichert!')
    } catch (error) {
      toast.error('Fehler beim Speichern der Einstellungen')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
          <SettingsIcon className="h-8 w-8 mr-3" />
          Einstellungen
        </h1>
        <p className="text-gray-600">
          Verwalten Sie Ihre persönlichen Einstellungen und Präferenzen
        </p>
      </div>

      <div className="max-w-4xl space-y-8">
        {/* Profil-Einstellungen (nur anzeigen, nicht editierbar) */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center mb-6">
            <User className="h-5 w-5 text-blue-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">Profil-Einstellungen</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Anzeigename</label>
              <input
                type="text"
                value={settings.displayName}
                disabled
                readOnly
                className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-100 text-gray-500 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">E-Mail</label>
              <input
                type="email"
                value={settings.email}
                disabled
                readOnly
                className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-100 text-gray-500 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Abteilung</label>
              <input
                type="text"
                value={settings.department}
                disabled
                readOnly
                className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-100 text-gray-500 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
              <input
                type="text"
                value={settings.position}
                disabled
                readOnly
                className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-100 text-gray-500 cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* Darstellung */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center mb-6">
            <Globe className="h-5 w-5 text-purple-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">Darstellung</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
              <select
                value={settings.theme}
                onChange={(e) => handleSettingChange('theme', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Theme auswählen"
              >
                <option value="light">Hell</option>
                <option value="dark">Dunkel</option>
                <option value="system">System</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sprache</label>
              <select
                value={settings.language}
                onChange={(e) => handleSettingChange('language', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Sprache auswählen"
              >
                <option value="de">Deutsch</option>
                <option value="en">English</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Schriftgröße</label>
              <select
                value={settings.fontSize}
                onChange={(e) => handleSettingChange('fontSize', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Schriftgröße auswählen"
              >
                <option value="small">Klein</option>
                <option value="medium">Mittel</option>
                <option value="large">Groß</option>
              </select>
            </div>
          </div>
        </div>

        {/* Benachrichtigungen (immer an, nicht editierbar) */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center mb-6">
            <Bell className="h-5 w-5 text-yellow-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">Benachrichtigungen</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">E-Mail-Benachrichtigungen</h3>
                <p className="text-sm text-gray-500">Erhalten Sie wichtige Updates per E-Mail</p>
              </div>
              <button
                className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600 cursor-not-allowed"
                disabled
                aria-label="E-Mail-Benachrichtigungen immer aktiviert"
              >
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Push-Benachrichtigungen</h3>
                <p className="text-sm text-gray-500">Sofortige Benachrichtigungen im Browser</p>
              </div>
              <button
                className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600 cursor-not-allowed"
                disabled
                aria-label="Push-Benachrichtigungen immer aktiviert"
              >
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Schulungs-Erinnerungen</h3>
                <p className="text-sm text-gray-500">Erinnerungen für anstehende Schulungen</p>
              </div>
              <button
                className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600 cursor-not-allowed"
                disabled
                aria-label="Schulungs-Erinnerungen immer aktiviert"
              >
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Zertifikat-Ablauf-Warnungen</h3>
                <p className="text-sm text-gray-500">Warnungen vor ablaufenden Zertifikaten</p>
              </div>
              <button
                className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600 cursor-not-allowed"
                disabled
                aria-label="Zertifikat-Ablauf-Warnungen immer aktiviert"
              >
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Cookie Settings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center mb-6">
            <Cookie className="h-5 w-5 text-orange-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">Cookie-Einstellungen</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Notwendige Cookies</h3>
                <p className="text-sm text-gray-500">Für die Grundfunktionen der Website erforderlich</p>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <span>Immer aktiv</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Analyse-Cookies</h3>
                <p className="text-sm text-gray-500">Helfen uns zu verstehen, wie die Website genutzt wird</p>
              </div>
              <button
                onClick={() => handleSettingChange('analyticsCookies', !settings.analyticsCookies)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.analyticsCookies ? 'bg-blue-600' : 'bg-gray-200'
                }`}
                aria-label={`Analyse-Cookies ${settings.analyticsCookies ? 'deaktivieren' : 'aktivieren'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.analyticsCookies ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Marketing-Cookies</h3>
                <p className="text-sm text-gray-500">Für personalisierte Inhalte und Werbung</p>
              </div>
              <button
                onClick={() => handleSettingChange('marketingCookies', !settings.marketingCookies)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.marketingCookies ? 'bg-blue-600' : 'bg-gray-200'
                }`}
                aria-label={`Marketing-Cookies ${settings.marketingCookies ? 'deaktivieren' : 'aktivieren'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.marketingCookies ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSaveSettings}
            disabled={isSaving}
            className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Speichere...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Einstellungen speichern
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Settings 