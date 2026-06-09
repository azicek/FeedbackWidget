import { MessageSquare, TrendingUp, Star, Code } from 'lucide-react'
import { useAuth } from '../Context/AuthContext'

function Dashboard() {
  const { user } = useAuth()
  const feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || []

  const thisMonth = feedbacks.filter(f => {
    const date = new Date(f.id)
    const now = new Date()
    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
  })

  const avgRating = feedbacks.length
    ? (feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length).toFixed(1)
    : '0.0'

  const stats = [
    { label: 'Jami feedbacklar', value: feedbacks.length, icon: MessageSquare, color: 'bg-blue-50 text-blue-500' },
    { label: 'Bu oy', value: thisMonth.length, icon: TrendingUp, color: 'bg-green-50 text-green-500' },
    { label: "O'rtacha reyting", value: avgRating, icon: Star, color: 'bg-yellow-50 text-yellow-500' },
  ]

  return (
    <div className="max-w-6xl mx-auto w-full">

      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">
          Xush kelibsiz, {user?.username}! 👋
        </h1>
        <p className="text-xs md:text-sm text-gray-400 mt-1">Saytingiz feedback statistikasi</p>
      </div>

      {/* Stat kartalar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-xl md:rounded-2xl border border-gray-100 p-4 md:p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <span className="text-xs md:text-sm text-gray-500">{label}</span>
              <div className={`w-8 md:w-9 h-8 md:h-9 rounded-lg md:rounded-xl flex items-center justify-center ${color}`}>
                <Icon size={16} />
              </div>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-gray-900">{value}</p>
          </div>
        ))}
      </div>

      {/* Embed kodi */}
      <div className="bg-white rounded-xl md:rounded-2xl border border-gray-100 p-4 md:p-6 shadow-sm mb-4 md:mb-6">
        <div className="flex items-center gap-2 mb-3 md:mb-4">
          <Code size={18} className="text-green-500" />
          <h2 className="text-xs md:text-sm font-semibold text-gray-900">Saytingizga qo'shish</h2>
        </div>
        <div className="bg-gray-50 rounded-lg md:rounded-xl p-3 md:p-4 font-mono text-xs text-gray-600 border border-gray-100 overflow-x-auto">
          {`<script src="https://feedbackwidget.io/widget.js" data-key="YOUR_API_KEY"></script>`}
        </div>
        <button
          onClick={() => navigator.clipboard.writeText(`<script src="https://feedbackwidget.io/widget.js" data-key="YOUR_API_KEY"></script>`)}
          className="mt-2 md:mt-3 text-xs text-green-500 hover:text-green-600 font-medium transition"
        >
          Nusxalash
        </button>
      </div>

      {/* So'nggi feedbacklar */}
      <div className="bg-white rounded-xl md:rounded-2xl border border-gray-100 p-4 md:p-6 shadow-sm">
        <h2 className="text-xs md:text-sm font-semibold text-gray-900 mb-3 md:mb-4">So'nggi feedbacklar</h2>
        {feedbacks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 md:py-12 text-center">
            <div className="w-10 md:w-12 h-10 md:h-12 bg-gray-50 rounded-xl md:rounded-2xl flex items-center justify-center mb-2 md:mb-3">
              <MessageSquare size={18} className="text-gray-300" />
            </div>
            <p className="text-xs md:text-sm text-gray-400">Hali feedback yo'q</p>
            <p className="text-xs text-gray-300 mt-1">Saytingizga widget qo'shgach feedbacklar bu yerda chiqadi</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2 md:gap-3">
            {feedbacks.slice(0, 5).map(fb => (
              <div key={fb.id} className="flex items-start gap-2 md:gap-3 p-2 md:p-3 rounded-lg md:rounded-xl bg-gray-50">
                <div className="w-7 md:w-8 h-7 md:h-8 rounded-full bg-green-50 flex items-center justify-center text-green-500 font-bold text-xs shrink-0">
                  {fb.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1">
                    <span className="text-xs font-medium text-gray-900 truncate">{fb.name}</span>
                    <span className="text-xs text-gray-400">{fb.date}</span>
                  </div>
                  <div className="flex gap-0.5 my-1">
                    {[1,2,3,4,5].map(star => (
                      <span key={star} className={`text-xs ${star <= fb.rating ? 'text-yellow-400' : 'text-gray-200'}`}>★</span>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 line-clamp-2">{fb.message}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  )
}

export default Dashboard