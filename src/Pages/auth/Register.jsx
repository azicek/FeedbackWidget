import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', password: ''
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Keyinroq backend ulanamiz
    // Hozir OTP sahifasiga o'tamiz
    localStorage.setItem('pending_user', JSON.stringify(form))
    navigate('/auth/verify')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 w-full max-w-md">
        
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Hisob yaratish
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            FeedbackWidget ga xush kelibsiz
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="text-xs font-medium text-gray-600 mb-1 block">Ism</label>
              <input
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="Ism"
                required
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-green-400 transition"
              />
            </div>
            <div className="flex-1">
              <label className="text-xs font-medium text-gray-600 mb-1 block">Familya</label>
              <input
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Familya"
                required
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-green-400 transition"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="email@example.com"
              required
              className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-green-400 transition"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">Parol</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Kamida 8 ta belgi"
              required
              className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-green-400 transition"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2.5 rounded-lg text-sm transition mt-2"
          >
            Davom etish
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-6">
          Hisobingiz bormi?{' '}
          <Link to="/auth/login" className="text-green-500 font-medium hover:underline">
            Kirish
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register