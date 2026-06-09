import { useState } from 'react'
import { MessageSquare, Trash2, Plus, X } from 'lucide-react'

function Feedbacks() {
  const [feedbacks, setFeedbacks] = useState(
    JSON.parse(localStorage.getItem('feedbacks')) || []
  )
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: '', message: '', rating: 5 })

  const handleAdd = (e) => {
    e.preventDefault()
    const newFeedback = {
      id: Date.now(),
      ...form,
      date: new Date().toLocaleDateString('uz-UZ')
    }
    const updated = [newFeedback, ...feedbacks]
    setFeedbacks(updated)
    localStorage.setItem('feedbacks', JSON.stringify(updated))
    setForm({ name: '', message: '', rating: 5 })
    setShowForm(false)
  }

  const handleDelete = (id) => {
    const updated = feedbacks.filter(f => f.id !== id)
    setFeedbacks(updated)
    localStorage.setItem('feedbacks', JSON.stringify(updated))
  }

  return (
    <div className="max-w-5xl mx-auto w-full">

      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 md:mb-8">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Feedbacklar</h1>
          <p className="text-xs md:text-sm text-gray-400 mt-1">{feedbacks.length} ta feedback</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-3 md:px-4 py-2 rounded-lg md:rounded-xl text-xs md:text-sm font-medium transition w-full md:w-auto justify-center md:justify-start"
        >
          <Plus size={16} />
          Yangi feedback
        </button>
      </div>

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl md:rounded-2xl p-5 md:p-6 w-full max-w-md shadow-xl border border-gray-100">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <h2 className="text-sm md:text-base font-semibold text-gray-900">Feedback qo'shish</h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAdd} className="flex flex-col gap-3 md:gap-4">
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">Ism</label>
                <input
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="Foydalanuvchi ismi"
                  required
                  className="w-full px-3 py-2 md:py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-green-400 transition"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">Xabar</label>
                <textarea
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  placeholder="Feedback matni..."
                  required
                  rows={3}
                  className="w-full px-3 py-2 md:py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-green-400 transition resize-none"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-gray-600 mb-2 block">Reyting</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setForm({ ...form, rating: star })}
                      className={`text-xl md:text-2xl transition ${star <= form.rating ? 'text-yellow-400' : 'text-gray-200'}`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 md:py-2.5 rounded-lg text-sm transition mt-1 md:mt-2"
              >
                Qo'shish
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Feedbacklar ro'yxati */}
      {feedbacks.length === 0 ? (
        <div className="bg-white rounded-xl md:rounded-2xl border border-gray-100 p-8 md:p-12 flex flex-col items-center justify-center text-center shadow-sm">
          <div className="w-10 md:w-12 h-10 md:h-12 bg-gray-50 rounded-xl md:rounded-2xl flex items-center justify-center mb-2 md:mb-3">
            <MessageSquare size={18} className="text-gray-300" />
          </div>
          <p className="text-xs md:text-sm text-gray-400">Hali feedback yo'q</p>
          <p className="text-xs text-gray-300 mt-1">Yuqoridagi tugma orqali qo'shing</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2 md:gap-3">
          {feedbacks.map(fb => (
            <div key={fb.id} className="bg-white rounded-lg md:rounded-2xl border border-gray-100 p-3 md:p-5 shadow-sm flex gap-3 md:gap-4">
              <div className="w-8 md:w-9 h-8 md:h-9 rounded-full bg-green-50 flex items-center justify-center text-green-500 font-bold text-xs md:text-sm flex-shrink-0">
                {fb.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1 md:gap-2 mb-1">
                  <span className="text-xs md:text-sm font-medium text-gray-900 truncate">{fb.name}</span>
                  <div className="flex items-center gap-2 md:gap-3">
                    <span className="text-xs text-gray-400">{fb.date}</span>
                    <button
                      onClick={() => handleDelete(fb.id)}
                      className="text-gray-300 hover:text-red-400 transition flex-shrink-0"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
                <div className="flex gap-0.5 mb-1 md:mb-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <span key={star} className={`text-xs md:text-sm ${star <= fb.rating ? 'text-yellow-400' : 'text-gray-200'}`}>★</span>
                  ))}
                </div>
                <p className="text-xs md:text-sm text-gray-500 line-clamp-3">{fb.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  )
}

export default Feedbacks