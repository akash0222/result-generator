import { useState } from 'react'

import axios from 'axios'

import { useNavigate }
from 'react-router-dom'

import API_URL from '../config'

function Login() {

  const [role, setRole] =
    useState('student')

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

        // ======================
        // STUDENT LOGIN
        // ======================

        if (role === 'student') {

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
        }

        // ======================
        // FACULTY LOGIN
        // ======================

        else {

          const res =
            await axios.post(

              `${API_URL}/api/faculty/login`,

              {
                email: roll,
                password
              }
            )

          localStorage.setItem(

            'facultyToken',

            res.data.token
          )

          navigate(
            '/dashboard'
          )
        }

      } catch (error) {

        alert(

          error.response?.data?.message ||

          'Login failed'
        )
      }
    }

  return (

    <div className="min-h-screen bg-gray-100 flex items-center justify-center">

      <form

        onSubmit={handleLogin}

        className="bg-white p-8 rounded-xl shadow w-full max-w-md"
      >

        <h1 className="text-4xl font-bold text-blue-700 text-center mb-6">
          ERP Login
        </h1>

        {/* ROLE */}

        <select

          value={role}

          onChange={(e) =>
            setRole(e.target.value)
          }

          className="w-full border p-3 rounded-lg mb-4"
        >

          <option value="student">
            Student Login
          </option>

          <option value="faculty">
            Faculty Login
          </option>

        </select>

        {/* ROLL / EMAIL */}

        <input

          type="text"

          placeholder={
            role === 'student'
              ? 'Roll Number'
              : 'Faculty Email'
          }

          value={roll}

          onChange={(e) =>
            setRoll(e.target.value)
          }

          className="w-full border p-3 rounded-lg mb-4"

          required
        />

        {/* PASSWORD */}

        <input

          type="password"

          placeholder="Password"

          value={password}

          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }

          className="w-full border p-3 rounded-lg mb-4"

          required
        />

        {/* BUTTON */}

        <button

          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
        >
          Login
        </button>

      </form>

    </div>
  )
}

export default Login