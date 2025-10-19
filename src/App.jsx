import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeContextProvider } from './contexts/ThemeContext'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import AdminLogin from './pages/admin/Login'
import AdminDashboard from './pages/admin/Dashboard'
import AdminApplications from './pages/admin/Applications'
import AdminUsers from './pages/admin/Users'
import AdminMonitoring from './pages/admin/Monitoring'
import AdminLogs from './pages/admin/Logs'
import AdminLayout from './components/admin/AdminLayout'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <ThemeContextProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
          </Route>

          {/* Admin Login */}
          <Route path="/admin/login" element={<AdminLogin />} />
          
          {/* Admin Routes with Sidebar Layout */}
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route index element={<AdminDashboard />} />
            <Route path="applications" element={<AdminApplications />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="monitoring" element={<AdminMonitoring />} />
            <Route path="logs" element={<AdminLogs />} />
          </Route>
        </Routes>
      </Router>
    </ThemeContextProvider>
  )
}

export default App
