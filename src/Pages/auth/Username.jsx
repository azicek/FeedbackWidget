import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../Context/AuthContext'

function Username() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [username, setUsername] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const pending = JSON.parse(localStorage.getItem('pending_user')) || {}
    const userData = { ...pending, username }
    login(userData)
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 w-full max-w-md">

        <div className="mb-8 text-center">
          <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">👤</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Foydalanuvchi nom</h1>
          <p className="text-sm text-gray-400 mt-1">
            O'zingizga nom tanlang
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">
              Foydalanuvchi nomi
            </label>
            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden focus-within:border-green-400 transition">
              <span className="px-3 text-gray-400 text-sm bg-gray-50 py-2.5 border-r border-gray-200">@</span>
              <input
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="username"
                required
                className="flex-1 px-3 py-2.5 text-sm outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2.5 rounded-lg text-sm transition mt-2"
          >
            Boshlash
          </button>
        </form>

      </div>
    </div>
  )
}

export default Username