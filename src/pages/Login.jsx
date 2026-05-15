import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {

  const navigate = useNavigate()

  const [role, setRole] = useState('admin')

  const [formData, setFormData] = useState({
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
  const handleSubmit = (e) => {

    e.preventDefault()

    // ADMIN LOGIN
    if (
      role === 'admin' &&
      formData.username === 'admin' &&
      formData.password === 'admin123'
    ) {

      localStorage.setItem(
        'role',
        'admin'
      )

      localStorage.setItem(
        'isLoggedIn',
        'true'
      )

      navigate('/dashboard')

      return
    }

    // STUDENT LOGIN
    if (role === 'student') {

      const students =
        JSON.parse(
          localStorage.getItem('students')
        ) || []

      const student =
        students.find(
          (s) =>
            s.roll === formData.username
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

        navigate('/student-dashboard')

      } else {

        alert('Invalid Roll Number')
      }
    }
  }

  return (

    <div className="min-h-screen bg-gray-100 flex items-center justify-center">

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
        {role === 'admin' && (

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg mb-4"
            required
          />

        )}

        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
        >
          Login
        </button>

      </form>

    </div>
  )
}

export default Login