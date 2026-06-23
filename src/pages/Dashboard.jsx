import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import API_URL from '../config'

function Dashboard() {
  const navigate = useNavigate()

  const [students, setStudents] = useState([])
  const [teachers, setTeachers] = useState([])
  const [classes, setClasses] = useState([])
  const [school, setSchool] = useState(null)

  const token = localStorage.getItem('token')

  const config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  }

  useEffect(() => {
    if (!token) {
      navigate('/login')
      return
    }

    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [
        studentRes,
        teacherRes,
        classRes,
        schoolRes,
      ] = await Promise.all([
        axios.get(`${API_URL}/api/students`, config),
        axios.get(`${API_URL}/api/faculty`, config),
        axios.get(`${API_URL}/api/classes`, config),
        axios.get(`${API_URL}/api/school-profile`, config),
      ])

      setStudents(
        studentRes?.data?.data ||
        studentRes?.data ||
        []
      )

      setTeachers(
        teacherRes?.data?.data ||
        teacherRes?.data ||
        []
      )

      setClasses(
        classRes?.data?.data ||
        classRes?.data ||
        []
      )

      setSchool(
        schoolRes?.data || null
      )
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="p-6">

      <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">

        <h1 className="text-4xl font-bold">
          🏫 {school?.schoolName || 'School ERP'}
        </h1>

        <p className="text-gray-500 mt-2">
          Principal:
          {' '}
          {school?.principalName || 'N/A'}
        </p>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

        <Stat
          title="Students"
          value={students.length}
          icon="👨‍🎓"
        />

        <Stat
          title="Teachers"
          value={teachers.length}
          icon="👩‍🏫"
        />

        <Stat
          title="Classes"
          value={classes.length}
          icon="🏫"
        />

        <Stat
          title="Attendance"
          value="94%"
          icon="📅"
        />

      </div>

      <div className="bg-white rounded-3xl shadow-lg p-6 mb-8">

        <h2 className="text-2xl font-bold mb-5">
          Quick Actions
        </h2>

        <div className="flex flex-wrap gap-4">

          <button
            onClick={() =>
              navigate('/students')
            }
            className="bg-blue-600 text-white px-5 py-3 rounded-xl"
          >
            Add Student
          </button>

          <button
            onClick={() =>
              navigate('/classes')
            }
            className="bg-green-600 text-white px-5 py-3 rounded-xl"
          >
            Manage Classes
          </button>

          <button
            onClick={() =>
              navigate('/attendance')
            }
            className="bg-purple-600 text-white px-5 py-3 rounded-xl"
          >
            Attendance
          </button>

          <button
            onClick={() =>
              navigate('/school-profile')
            }
            className="bg-orange-600 text-white px-5 py-3 rounded-xl"
          >
            School Profile
          </button>

        </div>

      </div>

      <div className="bg-white rounded-3xl shadow-lg p-8">

        <h2 className="text-2xl font-bold mb-5">
          Recent Activity
        </h2>

        <div className="space-y-3">

          <div>
            👨‍🎓 Student Added
          </div>

          <div>
            🏫 Class Created
          </div>

          <div>
            📅 Attendance Updated
          </div>

          <div>
            👩‍🏫 Teacher Updated
          </div>

        </div>

      </div>

    </div>
  )
}

function Stat({
  title,
  value,
  icon,
}) {
  return (
    <div className="bg-white rounded-3xl shadow-md p-6">

      <div className="flex justify-between items-center">

        <div>

          <p className="text-gray-500">
            {title}
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {value}
          </h2>

        </div>

        <div className="text-5xl">
          {icon}
        </div>

      </div>

    </div>
  )
}

export default Dashboard