import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import CheckIn from './pages/CheckIn'
import Profile from './pages/Profile'
import Calendar from './pages/Calendar'
import Reports from './pages/Reports'
import Resources from './pages/Resources'
import PrivateRoute from './components/PrivateRoute'
import { AuthProvider } from './context/AuthContext'
import { Toaster } from 'react-hot-toast'


export default function App() {
  return (
    <AuthProvider>
   
        <Router>
          <div className="min-h-screen bg-background">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/check-in"
                element={
                  <PrivateRoute>
                    <CheckIn />
                  </PrivateRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                }
              />
              <Route
                path="/calendar"
                element={
                  <PrivateRoute>
                    <Calendar />
                  </PrivateRoute>
                }
              />
              <Route
                path="/reports"
                element={
                  <PrivateRoute>
                    <Reports />
                  </PrivateRoute>
                }
              />
              <Route path="/resources" element={<Resources />} />
            </Routes>
            <Toaster position="top-right" />
          </div>
        </Router>
    
    </AuthProvider>
  )
}














