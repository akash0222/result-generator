import { useState } from 'react'

import axios from 'axios'

import { useNavigate }
from 'react-router-dom'

import API_URL from '../config'

function StudentLogin() {

  const [roll, setRoll] =
    useState('')

  const [password, setPassword] =
    useState('')

  const navigate =
    useNavigate()

  const handleLogin =
    async (e) => {

      e.preventDefault()

      try {

        const res =
          await axios.post(

            `${API_URL}/api/student-auth/login`,

            {
              roll,
              password
            }
          )

        localStorage.setItem(

          'studentToken',

          res.data.token
        )

        localStorage.setItem(

          'student',

          JSON.stringify(
            res.data.student
          )
        )

        localStorage.setItem(

          'studentRoll',

          res.data.student.roll
        )

        navigate(
          '/student-dashboard'
        )

      } catch (error) {

        alert(

          error.response?.data?.message ||

          'Login failed'
        )
      }
    }

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form

        onSubmit={handleLogin}

        className="bg-white p-8 rounded-xl shadow w-full max-w-md"
      >

        <h1 className="text-3xl font-bold text-indigo-600 mb-6 text-center">
          Student Login
        </h1>

        <input

          type="text"

          placeholder="Roll Number"

          value={roll}

          onChange={(e) =>
            setRoll(e.target.value)
          }

          className="w-full border p-3 rounded-lg mb-4"

          required
        />

        <input

          type="password"

          placeholder="Password"

          value={password}

          onChange={(e) =>
            setPassword(e.target.value)
          }

          className="w-full border p-3 rounded-lg mb-4"

          required
        />

        <button

          className="w-full bg-indigo-600 text-white py-3 rounded-lg"
        >
          Login
        </button>

      </form>

    </div>
  )
}

export default StudentLogin