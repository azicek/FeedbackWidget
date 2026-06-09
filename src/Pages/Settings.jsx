import { useState } from 'react'
import { Code, Copy, Check, User, Mail, Lock } from 'lucide-react'
import { useAuth } from '../Context/AuthContext'

function Settings() {
  const { user } = useAuth()
  const [copied, setCopied] = useState(false)

  const apiKey = 'fw_' + btoa(user?.email || '').slice(0, 16)

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `<script src="https://feedbackwidget.io/widget.js" data-key="${apiKey}"></script>`
    )
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="max-w-3xl mx-auto">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Sozlamalar</h1>
        <p className="text-sm text-gray-400 mt-1">Hisob va widget sozlamalari</p>
      </div>

      {/* Profil */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm mb-4">
        <h2 className="text-sm font-semibold text-gray-900 mb-4">Profil ma'lumotlari</h2>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
            <User size={16} className="text-gray-400" />
            <div>
              <p className="text-xs text-gray-400">Foydalanuvchi nomi</p>
              <p className="text-sm font-medium text-gray-900">@{user?.username}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
            <Mail size={16} className="text-gray-400" />
            <div>
              <p className="text-xs text-gray-400">Email</p>
              <p className="text-sm font-medium text-gray-900">{user?.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
            <User size={16} className="text-gray-400" />
            <div>
              <p className="text-xs text-gray-400">Ism Familya</p>
              <p className="text-sm font-medium text-gray-900">{user?.firstName} {user?.lastName}</p>
            </div>
          </div>
        </div>
      </div>

      {/* API Key va Embed kodi */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm mb-4">
        <div className="flex items-center gap-2 mb-4">
          <Code size={16} className="text-green-500" />
          <h2 className="text-sm font-semibold text-gray-900">Widget embed kodi</h2>
        </div>

        <div className="mb-3">
          <p className="text-xs text-gray-400 mb-1">API Key</p>
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5">
            <Lock size={14} className="text-gray-400" />
            <span className="font-mono text-sm text-gray-700 flex-1">{apiKey}</span>
          </div>
        </div>

        <div>
          <p className="text-xs text-gray-400 mb-1">Saytingizga qo'shing</p>
          <div className="bg-gray-50 rounded-xl p-4 font-mono text-xs text-gray-600 border border-gray-100">
            {`<script src="https://feedbackwidget.io/widget.js" data-key="${apiKey}"></script>`}
          </div>
          <button
            onClick={handleCopy}
            className="mt-3 flex items-center gap-1.5 text-xs text-green-500 hover:text-green-600 font-medium transition"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? 'Nusxalandi!' : 'Nusxalash'}
          </button>
        </div>
      </div>

      {/* Qo'llanma */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h2 className="text-sm font-semibold text-gray-900 mb-4">Qo'llanma</h2>
        <div className="flex flex-col gap-3">
          {[
            { step: '1', text: 'Yuqoridagi kodni nusxalang' },
            { step: '2', text: 'Saytingizning </body> tegidan oldin joylashtiring' },
            { step: '3', text: 'Saytingizda widget paydo bo\'ladi' },
            { step: '4', text: 'Feedbacklar dashboardda ko\'rinadi' },
          ].map(({ step, text }) => (
            <div key={step} className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-green-50 text-green-500 text-xs font-bold flex items-center justify-center shrink-0">
                {step}
              </div>
              <p className="text-sm text-gray-500">{text}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default Settings