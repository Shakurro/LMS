import { Globe } from 'lucide-react'

interface AppearanceSettingsProps {
  settings: {
    theme: 'light' | 'dark' | 'system'
    language: 'de' | 'en'
    fontSize: 'small' | 'medium' | 'large'
  }
  onSettingChange: (key: string, value: any) => void
}

const AppearanceSettings: React.FC<AppearanceSettingsProps> = ({ settings, onSettingChange }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center mb-6">
        <Globe className="h-5 w-5 text-purple-600 mr-2" />
        <h2 className="text-xl font-semibold text-gray-900">Darstellung</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Theme
          </label>
          <select
            value={settings.theme}
            onChange={(e) => onSettingChange('theme', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Theme auswählen"
          >
            <option value="light">Hell</option>
            <option value="dark">Dunkel</option>
            <option value="system">System</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sprache
          </label>
          <select
            value={settings.language}
            onChange={(e) => onSettingChange('language', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Sprache auswählen"
          >
            <option value="de">Deutsch</option>
            <option value="en">English</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Schriftgröße
          </label>
          <select
            value={settings.fontSize}
            onChange={(e) => onSettingChange('fontSize', e.target.value)}
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
  )
}

export default AppearanceSettings 