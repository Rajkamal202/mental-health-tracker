import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Button } from './ui/button'
import { Bell, LineChartIcon, BookOpen, BarChart2, Settings, Calendar } from 'lucide-react'

function NavItem({ href, icon: Icon, children }) {
  return (
    <Link to={href} className="flex items-center">
      {Icon && <Icon className="h-5 w-5 mr-2" />}
      {children}
    </Link>
  );
}

export default function Navbar() {
  const { user, logout } = useAuth()

  return (
    <nav className="border-b bg-white shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-primary">
          Mental Health Check-in
        </Link>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <NavItem href="/dashboard" icon={LineChartIcon}>Dashboard</NavItem>
              <NavItem href="/calendar" icon={Calendar}>Calendar</NavItem>
              <NavItem href="/check-in" icon={BookOpen}>Check-in</NavItem>
              <NavItem href="/reports" icon={BarChart2}>Reports</NavItem>
              <NavItem href="/profile" icon={Settings}>Profile</NavItem>
              <Button variant="ghost" size="icon" className="ml-2">
                <Bell className="h-4 w-4" />
              </Button>
              <Button onClick={logout} variant="outline">
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/register">
                <Button>Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}





