import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

function Verify() {
  const navigate = useNavigate()
  const [code, setCode] = useState(['', '', '', '', '', ''])
  const inputs = useRef([])

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return
    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)

    if (value && index < 5) {
      inputs.current[index + 1].focus()
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputs.current[index - 1].focus()
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const fullCode = code.join('')
    if (fullCode.length < 6) return
    // Hozircha har qanday kod o'tadi
    navigate('/auth/username')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 w-full max-w-md">

        <div className="mb-8 text-center">
          <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">✉️</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Emailni tasdiqlang</h1>
          <p className="text-sm text-gray-400 mt-1">
            Emailingizga 6 xonali kod yubordik
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex justify-center gap-3 mb-6">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={el => inputs.current[index] = el}
                type="text"
                maxLength={1}
                value={digit}
                onChange={e => handleChange(index, e.target.value)}
                onKeyDown={e => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-lg font-bold border border-gray-200 rounded-lg outline-none focus:border-green-400 transition"
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2.5 rounded-lg text-sm transition"
          >
            Tasdiqlash
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-6">
          Kod kelmadimi?{' '}
          <button className="text-green-500 font-medium hover:underline">
            Qayta yuborish
          </button>
        </p>

      </div>
    </div>
  )
}

export default Verify