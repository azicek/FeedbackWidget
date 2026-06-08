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
  return (
    <Routes>
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />
      <Route path="/auth/verify" element={<Verify />} />
      <Route path="/auth/username" element={<Username />} />

      <Route path="/*" element={
        <ProtectedRoute>
          <div className="flex">
            <Sidebar />
            <main className="flex-1 p-8 bg-gray-50 min-h-screen">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/feedbacks" element={<Feedbacks />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/billing" element={<Billing />} />
              </Routes>
            </main>
          </div>
        </ProtectedRoute>
      } />
    </Routes>
  )
}

export default App