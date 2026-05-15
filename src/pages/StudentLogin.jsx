import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function StudentLogin() {

  const [roll, setRoll] =
    useState('')

  const navigate =
    useNavigate()

  const handleLogin = () => {

    if (!roll) {

      alert('Enter Roll Number')

      return
    }

    localStorage.setItem(
      'studentRoll',
      roll
    )

    navigate('/student-dashboard')
  }

  return (

    <div className="min-h-screen bg-gray-100 flex items-center justify-center">

      <div className="bg-white p-8 rounded-xl shadow w-full max-w-md">

        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          Student Login
        </h1>

        <input
          type="text"
          placeholder="Enter Roll Number"
          value={roll}
          onChange={(e) =>
            setRoll(e.target.value)
          }
          className="w-full border p-3 rounded-lg mb-4"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg"
        >
          Login
        </button>

      </div>

    </div>
  )
}

export default StudentLogin