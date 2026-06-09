import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/Layout/ProtectedRoute'
import Sidebar from './components/Layout/Sidebar'
import Home from './Pages/Home'
import Dashboard from './Pages/Dashboard'
import Feedbacks from './Pages/Feedbacks'
import Settings from './Pages/Settings'
import Billing from './Pages/Billing'
import Login from './Pages/auth/Login'
import Register from './Pages/auth/Register'
import Verify from './Pages/auth/Verify'
import Username from './Pages/auth/Username'

function App() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false)

  return (
    <Routes>
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />
      <Route path="/auth/verify" element={<Verify />} />
      <Route path="/auth/username" element={<Username />} />

      <Route path="/*" element={
        <ProtectedRoute>
          <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
              <div 
                className="fixed inset-0 bg-black/40 md:hidden z-40"
                onClick={() => setSidebarOpen(false)}
              />
            )}
            
            {/* Sidebar - Fixed on tablet/desktop */}
            <div className={`
              fixed md:fixed inset-y-0 left-0 transform transition-transform z-40 md:z-30
              ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
            `}>
              <Sidebar onClose={() => setSidebarOpen(false)} />
            </div>
            
            {/* Main content */}
            <main className="flex-1 flex flex-col md:ml-60">
              {/* Mobile header with hamburger */}
              <div className="md:hidden bg-white border-b border-gray-100 p-4 flex items-center justify-between">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="p-2 hover:bg-gray-50 rounded-lg transition"
                >
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                <h1 className="text-lg font-bold">FeedbackWidget</h1>
                <div className="w-6" />
              </div>
              
              {/* Content area */}
              <div className="flex-1 overflow-auto p-4 md:p-8">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/feedbacks" element={<Feedbacks />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/billing" element={<Billing />} />
                </Routes>
              </div>
            </main>
          </div>
        </ProtectedRoute>
      } />
    </Routes>
  )
}

export default App