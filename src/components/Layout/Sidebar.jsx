import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, MessageSquare, Settings, CreditCard, Home, LogOut } from 'lucide-react'
import { useAuth } from '../../Context/AuthContext'

const links = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/feedbacks', label: 'Feedbacks', icon: MessageSquare },
  { path: '/settings', label: 'Settings', icon: Settings },
  { path: '/billing', label: 'Billing', icon: CreditCard },
]

function Sidebar() {
  const { pathname } = useLocation()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    const confirmed = window.confirm('Chiqishni xohlaysizmi?')
    if (confirmed) {
      logout()
    }
  }

  return (
    <div className="w-60 h-screen bg-white border-r border-gray-100 flex flex-col p-5 shadow-sm">
      <div className="mb-10">
        <h1 className="text-lg font-bold text-gray-900">
          Feedback<span className="text-green-500">Widget</span>
        </h1>
        <p className="text-xs text-gray-400 mt-0.5">Analytics Dashboard</p>
      </div>

      <nav className="flex flex-col gap-1">
        {links.map(({ path, label, icon: Icon }) => (
          <Link
            key={path}
            to={path}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
              pathname === path
                ? 'bg-green-50 text-green-600 font-medium'
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
            }`}
          >
            <Icon size={18} />
            {label}
          </Link>
        ))}
      </nav>

      <div className="mt-auto">
        <div className="flex items-center gap-3 px-3 py-3 rounded-lg bg-gray-50 border border-gray-100">
          <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold">
            {user?.username?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div className="flex-1">
            <p className="text-xs font-medium text-gray-900">{user?.username || 'User'}</p>
            <p className="text-xs text-gray-400">Free plan</p>
          </div>
          <button onClick={handleLogout} className="text-gray-400 hover:text-red-400 transition">
            <LogOut size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Sidebar