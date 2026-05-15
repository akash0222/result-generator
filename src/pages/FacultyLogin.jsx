import {
  useState
} from 'react'

import axios from 'axios'

import {
  useNavigate
} from 'react-router-dom'

function FacultyLogin() {

  const [email,
    setEmail] =
      useState('')

  const [password,
    setPassword] =
      useState('')

  const navigate =
    useNavigate()

  const handleLogin =
    async (e) => {

      e.preventDefault()

      try {

        const res =
          await axios.post(

            'http://localhost:5000/api/faculty/login',

            {
              email,
              password
            }
          )

        localStorage.setItem(

          'facultyToken',

          res.data.token
        )

        localStorage.setItem(

          'faculty',

          JSON.stringify(
            res.data.faculty
          )
        )

        navigate(
          '/faculty-dashboard'
        )

      } catch (error) {

        alert(
          error.response?.data?.message
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

        <button

          className="w-full bg-blue-600 text-white py-3 rounded-lg"
        >
          Login
        </button>

      </form>

    </div>
  )
}

export default FacultyLogin