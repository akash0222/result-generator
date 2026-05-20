import {
  useState
} from 'react'

import axios from 'axios'

import {
  useNavigate
} from 'react-router-dom'

import API_URL from '../config'

function FacultyLogin() {

  const [email,
    setEmail] =
      useState('')

  const [password,
    setPassword] =
      useState('')

  const navigate =
    useNavigate()

  // LOGIN
  const handleLogin =
    async (e) => {

      e.preventDefault()

      try {

        const res =
          await axios.post(

            `${API_URL}/api/faculty/login`,

            {
              email,
              password
            }
          )

        // SAVE TOKEN
        localStorage.setItem(

          'facultyToken',

          res.data.token
        )

        // SAVE FACULTY
        localStorage.setItem(

          'faculty',

          JSON.stringify(
            res.data.faculty
          )
        )

        // REDIRECT
        navigate(
          '/faculty-dashboard'
        )

      } catch (error) {

        console.log(error)

        alert(

          error.response?.data?.message ||

          'Login Failed'
        )
      }
    }

  return (

    <div className="min-h-screen bg-gray-100 flex items-center justify-center">

      <form

        onSubmit={handleLogin}

        className="bg-white p-8 rounded-xl shadow w-full max-w-md"
      >

        <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
          Faculty Login
        </h1>

        {/* EMAIL */}
        <input

          type="email"

          placeholder="Email"

          value={email}

          onChange={(e) =>

            setEmail(
              e.target.value
            )
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

          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
        >
          Login
        </button>

      </form>

    </div>
  )
}

export default FacultyLogin