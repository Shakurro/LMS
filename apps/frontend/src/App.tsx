import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import Layout from './components/Layout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Trainings from './pages/Trainings'
import Profile from './pages/Profile'
import Analytics from './pages/Analytics'
import CreateTraining from './pages/CreateTraining'
import Admin from './pages/Admin'
import ProtectedRoute from './components/ProtectedRoute'

function AppRoutes() {
  const { isAuthenticated } = useAuth()

  return (
    <Routes>
      <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="trainings" element={<Trainings />} />
        <Route path="profile" element={<Profile />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="admin" element={<Admin />} />
        <Route path="trainings/new" element={<CreateTraining />} />
      </Route>
    </Routes>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}

export default App 