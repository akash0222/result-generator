import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../utils/axios'

function Login() {

  const navigate = useNavigate()

  const [role, setRole] =
    useState('admin')

  const [loading, setLoading] =
    useState(false)

  const [formData, setFormData] =
    useState({
      username: '',
      password: ''
    })

  // HANDLE INPUT
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  // LOGIN
  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      setLoading(true)

      // =========================
      // ADMIN LOGIN
      // =========================
      if (role === 'admin') {

        const response =
          await API.post(
            '/api/auth/login',
            {
              username:
                formData.username,
              password:
                formData.password
            }
          )

        const data =
          response.data

        // SAVE TOKEN
        localStorage.setItem(
          'token',
          data.token
        )

        // SAVE ROLE
        localStorage.setItem(
          'role',
          data.role
        )

        localStorage.setItem(
          'isLoggedIn',
          'true'
        )

        navigate('/dashboard')

        return
      }

      // =========================
      // STUDENT LOGIN
      // =========================
      if (role === 'student') {

        const students =
          JSON.parse(
            localStorage.getItem(
              'students'
            )
          ) || []

        const student =
          students.find(
            (s) =>
              s.roll ===
              formData.username
          )

        if (student) {

          localStorage.setItem(
            'role',
            'student'
          )

          localStorage.setItem(
            'studentRoll',
            student.roll
          )

          localStorage.setItem(
            'isLoggedIn',
            'true'
          )

          navigate(
            '/student-dashboard'
          )

        } else {

          alert(
            'Invalid Roll Number'
          )
        }
      }

    } catch (error) {

      console.log(error)

      alert(

        error.response?.data?.message ||

        'Login failed'
      )

    } finally {

      setLoading(false)
    }
  }

  return (

    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow w-full max-w-md"
      >

        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
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

          <option value="admin">
            Admin Login
          </option>

          <option value="student">
            Student Login
          </option>

        </select>

        {/* USERNAME */}
        <input
          type="text"
          name="username"
          placeholder={
            role === 'admin'
              ? 'Username'
              : 'Roll Number'
          }
          value={formData.username}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg mb-4"
          required
        />

        {/* PASSWORD */}
        {
          role === 'admin' && (

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg mb-4"
              required
            />
          )
        }

        {/* BUTTON */}
        <button
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 rounded-lg"
        >

          {
            loading
              ? 'Logging in...'
              : 'Login'
          }

        </button>

      </form>

    </div>
  )
}

export default Login