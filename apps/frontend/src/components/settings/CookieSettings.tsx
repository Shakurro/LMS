import { Cookie } from 'lucide-react'

interface CookieSettingsProps {
  settings: {
    essentialCookies: boolean
    analyticsCookies: boolean
    marketingCookies: boolean
  }
  onSettingChange: (key: string, value: any) => void
}

const CookieSettings: React.FC<CookieSettingsProps> = ({ settings, onSettingChange }) => {
  return (
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
            onClick={() => onSettingChange('analyticsCookies', !settings.analyticsCookies)}
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
            onClick={() => onSettingChange('marketingCookies', !settings.marketingCookies)}
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
  )
}

export default CookieSettings 