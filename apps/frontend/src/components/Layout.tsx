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
  Users
} from 'lucide-react'
import { toast } from 'react-hot-toast'

const Layout: React.FC = () => {
  const { user, logout } = useAuth()
  const location = useLocation()

  const handleLogout = () => {
    logout()
    toast.success('Erfolgreich abgemeldet')
  }

  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Schulungen', href: '/trainings', icon: GraduationCap },
    { name: 'Profil', href: '/profile', icon: User },
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
              <button className="p-2 text-gray-400 hover:text-gray-500 relative" title="Benachrichtigungen">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
              </button>
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