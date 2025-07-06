import { Outlet, Link, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { 
  BookOpen, 
  Home, 
  GraduationCap, 
  User, 
  LogOut,
  Bell,
  Search,
  BarChart3,
  Plus,
  Shield,
  Users,
  CheckCircle,
  Calendar,
  Settings
} from 'lucide-react'
import { toast } from 'react-hot-toast'
import { useEffect, useRef, useState } from 'react'
import { useUserNotifications } from '../hooks/useApi'

const Layout: React.FC = () => {
  const { user, logout } = useAuth()
  const location = useLocation()
  const [notifOpen, setNotifOpen] = useState(false)
  const notifRef = useRef<HTMLDivElement>(null)
  const { data: notifications = [] } = useUserNotifications(user?.id || '')

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setNotifOpen(false)
      }
    }
    if (notifOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [notifOpen])

  const handleLogout = () => {
    logout()
    toast.success('Erfolgreich abgemeldet')
  }

  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Schulungen', href: '/trainings', icon: GraduationCap },
    { name: 'Kalender', href: '/calendar', icon: Calendar },
    { name: 'Profil', href: '/profile', icon: User },
    { name: 'Einstellungen', href: '/settings', icon: Settings },
  ]

  // Zusätzliche Navigation für LMS Manager
  const lmsNavigation = [
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
    { name: 'Neue Schulung anlegen', href: '/trainings/new', icon: Plus },
  ]

  // Admin Navigation
  const adminNavigation = [
    { name: 'Benutzerverwaltung', href: '/admin', icon: Users },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-semibold text-gray-900">LMS Portal</span>
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-500" title="Suchen">
                <Search className="h-5 w-5" />
              </button>
              <div className="relative" ref={notifRef}>
                <button
                  className="p-2 text-gray-400 hover:text-gray-500 relative"
                  title="Benachrichtigungen"
                  onClick={() => setNotifOpen((v) => !v)}
                >
                  <Bell className="h-5 w-5" />
                  {notifications.some(n => !n.read) && (
                    <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
                  )}
                </button>
                {notifOpen && (
                  <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                    <div className="px-4 py-3 border-b border-gray-100 font-semibold text-gray-900">Benachrichtigungen</div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length === 0 && (
                        <div className="p-4 text-gray-500 text-sm">Keine Benachrichtigungen</div>
                      )}
                      {notifications.slice(0, 8).map((n) => (
                        <div
                          key={n.id}
                          className={`px-4 py-3 border-b border-gray-100 flex items-start gap-3 cursor-pointer hover:bg-gray-50 ${!n.read ? 'bg-blue-50' : ''}`}
                          // Optional: onClick={() => ...}
                        >
                          <div className="mt-1">
                            {n.type === 'reminder' ? <Bell className="h-5 w-5 text-yellow-500" /> :
                             n.type === 'approval' ? <CheckCircle className="h-5 w-5 text-green-500" /> :
                             n.type === 'rejection' ? <span className="inline-block w-5 h-5 rounded-full bg-red-200 text-red-600 flex items-center justify-center font-bold">!</span> :
                             n.type === 'certificate' ? <BookOpen className="h-5 w-5 text-purple-500" /> :
                             <BookOpen className="h-5 w-5 text-blue-500" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-gray-900 text-sm truncate">{n.title}</div>
                            <div className="text-gray-600 text-sm break-words">{n.message}</div>
                            <div className="text-xs text-gray-400 mt-1">{new Date(n.date).toLocaleString('de-DE')}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-sm">
                  <p className="text-gray-900 font-medium">{user?.name}</p>
                  <p className="text-gray-500">{user?.department}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-400 hover:text-gray-500"
                  title="Abmelden"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex">
          {/* Sidebar */}
          <nav className="w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <ul className="space-y-2">
                {navigation.map((item) => {
                  const isActive = location.pathname === item.href
                  return (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                          isActive
                            ? 'bg-blue-100 text-blue-700'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <item.icon className="mr-3 h-5 w-5" />
                        {item.name}
                      </Link>
                    </li>
                  )
                })}
                {/* LMS Manager Links */}
                {user?.role === 'lms_manager' && lmsNavigation.map((item) => {
                  const isActive = location.pathname === item.href
                  return (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                          isActive
                            ? 'bg-blue-100 text-blue-700'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <item.icon className="mr-3 h-5 w-5" />
                        {item.name}
                      </Link>
                    </li>
                  )
                })}
                {/* Admin Links */}
                {user?.role === 'admin' && adminNavigation.map((item) => {
                  const isActive = location.pathname === item.href
                  return (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                          isActive
                            ? 'bg-red-100 text-red-700'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <item.icon className="mr-3 h-5 w-5" />
                        {item.name}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          </nav>

          {/* Main Content */}
          <main className="flex-1 ml-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}

export default Layout 