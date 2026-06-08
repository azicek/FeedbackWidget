import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../Context/AuthContext'

function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const savedUser = JSON.parse(localStorage.getItem('user')) ||
                      JSON.parse(localStorage.getItem('pending_user'))

    if (!savedUser) {
      setError("Foydalanuvchi topilmadi! Avval ro'yxatdan o'ting.")
      return
    }

    if (savedUser.email !== form.email || savedUser.password !== form.password) {
      setError("Email yoki parol noto'g'ri!")
      return
    }

    if (!savedUser.username) {
      navigate('/auth/username')
      return
    }

    login(savedUser)
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 w-full max-w-md">

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Kirish</h1>
          <p className="text-sm text-gray-400 mt-1">Hisobingizga kiring</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
              placeholder="Parolingiz"
              required
              className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-green-400 transition"
            />
          </div>

          {error && (
            <p className="text-xs text-red-500 bg-red-50 px-3 py-2 rounded-lg">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2.5 rounded-lg text-sm transition mt-2"
          >
            Kirish
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-6">
          Hisobingiz yo'qmi?{' '}
          <Link to="/auth/register" className="text-green-500 font-medium hover:underline">
            Ro'yxatdan o'tish
          </Link>
        </p>

      </div>
    </div>
  )
}

export default Login