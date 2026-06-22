import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import API_URL from '../config'

function Dashboard() {
  const navigate = useNavigate()

  const [students, setStudents] = useState([])
  const [subjects, setSubjects] = useState([])
  const [marks, setMarks] = useState([])
  const [school, setSchool] = useState(null)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [teachers, setTeachers] = useState([])  

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
      setLoading(true)

      const [
  studentRes,
  subjectRes,
  markRes,
  schoolRes,
  teacherRes,
] = await Promise.all([
  axios.get(`${API_URL}/api/students`, config),
  axios.get(`${API_URL}/api/subjects`, config),
  axios.get(`${API_URL}/api/marks`, config),
  axios.get(`${API_URL}/api/school-profile`, config),
  axios.get(`${API_URL}/api/faculty`, config),
])

      setStudents(studentRes?.data?.data || studentRes?.data || [])
      setSubjects(subjectRes?.data?.data || subjectRes?.data || [])
      setMarks(markRes?.data?.data || markRes?.data || [])
      setSchool(schoolRes?.data || null)
      setTeachers(
  teacherRes?.data?.data ||
  teacherRes?.data ||
  []
)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const failed = marks.filter(
    (mark) => mark.grade === 'F'
  ).length

  const passPercentage =
    marks.length > 0
      ? (
          ((marks.length - failed) / marks.length) *
          100
        ).toFixed(2)
      : '0.00'

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold">
          Loading Dashboard...
        </h1>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-center">

            <div>
              <h1 className="text-5xl font-bold text-slate-800">
                🏫 {school?.schoolName || 'School ERP'}
              </h1>

              <p className="text-gray-500 mt-2">
                School Code: {school?.schoolCode || 'N/A'}
              </p>

              <p className="text-gray-500">
                Principal: {school?.principalName || 'N/A'}
              </p>
            </div>

            <div className="flex flex-wrap gap-3 mt-5 lg:mt-0">

              <button
                onClick={() => navigate('/students')}
                className="bg-blue-600 text-white px-5 py-3 rounded-xl"
              >
                + Student
              </button>

              <button
                onClick={() => navigate('/subjects')}
                className="bg-green-600 text-white px-5 py-3 rounded-xl"
              >
                + Subject
              </button>

              <button
                onClick={() => navigate('/marks')}
                className="bg-purple-600 text-white px-5 py-3 rounded-xl"
              >
                Upload Marks
              </button>

            </div>
          </div>
        </div>

        {/* SEARCH */}

        <div className="mb-8">
          <input
            type="text"
            placeholder="Search student, subject, roll number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white rounded-2xl p-4 shadow-md outline-none"
          />
        </div>

        {/* STATS */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

          <Stat
            title="Students"
            value={students.length}
            icon="👨‍🎓"
          />

          <Stat
            title="Subjects"
            value={subjects.length}
            icon="📚"
          />

          <Stat
            title="Teachers"
            value={teachers.length}
            icon="👩‍🏫"
          />

          <Stat
            title="Attendance Today"
            value="94%"
            icon="📅"
          />

          

        </div>

        {/* OVERVIEW */}

        <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-3">
            Overview
          </h2>

          <p className="text-gray-600">
            Total Students: {students.length} |
            Subjects: {subjects.length} |
            Pass Rate: {passPercentage}% |
            Failed Records: {failed}
          </p>
        </div>

        {/* QUICK ACTIONS */}

        <div className="bg-white rounded-3xl shadow-lg p-6 mb-8">

          <h2 className="text-2xl font-bold mb-5">
            Quick Actions
          </h2>

          <div className="flex flex-wrap gap-4">

            <button
              onClick={() => navigate('/upload')}
              className="bg-blue-600 text-white px-5 py-3 rounded-xl"
            >
              Upload Data
            </button>

            <button
              onClick={() => navigate('/results')}
              className="bg-green-600 text-white px-5 py-3 rounded-xl"
            >
              Generate Results
            </button>

            <button
              onClick={() => navigate('/cgpa')}
              className="bg-purple-600 text-white px-5 py-3 rounded-xl"
            >
              Calculate CGPA
            </button>

            <button
              onClick={() => navigate('/ranklist')}
              className="bg-orange-600 text-white px-5 py-3 rounded-xl"
            >
              Rank List
            </button>

          </div>
        </div>

        {/* MODULES */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          <ERPModule
            icon="👨‍🎓"
            title="Students"
            description="Admissions & Student Records"
            onClick={() => navigate('/students')}
          />

          <ERPModule
            icon="👩‍🏫"
            title="Teachers"
            description="Teacher Management"
            onClick={() => navigate('/faculty-dashboard')}
          />

          <ERPModule
            icon="📚"
            title="Academics"
            description="Subjects & Curriculum"
            onClick={() => navigate('/subjects')}
          />

          <ERPModule
            icon="📝"
            title="Examinations"
            description="Marks & Results"
            onClick={() => navigate('/results')}
          />

          <ERPModule
            icon="📅"
            title="Attendance"
            description="Attendance Management"
            onClick={() => navigate('/attendance')}
          />

          <ERPModule
            icon="💰"
            title="Fees"
            description="Fee Collection"
            onClick={() => navigate('/fees')}
          />

          <ERPModule
            icon="📖"
            title="Library"
            description="Books Management"
            onClick={() => navigate('/library')}
          />

          <ERPModule
            icon="🚌"
            title="Transport"
            description="Transport Management"
            onClick={() => navigate('/transport')}
          />

          <ERPModule
            icon="⚙️"
            title="General"
            description="Master Data & Settings"
            onClick={() => navigate('/general')}
          />

        </div>

        {/* RECENT ACTIVITY */}

        <div className="bg-white rounded-3xl shadow-lg p-8 mt-10">

          <h2 className="text-2xl font-bold mb-6">
            Recent Activity
          </h2>

          <div className="space-y-4">

            <div className="border-b pb-3">
              ✅ Result generated successfully
            </div>

            <div className="border-b pb-3">
              📤 Marks uploaded
            </div>

            <div className="border-b pb-3">
              👨‍🎓 New student added
            </div>

            <div>
              📚 Subject updated
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

function ERPModule({
  icon,
  title,
  description,
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      className="
        bg-white
        rounded-3xl
        shadow-md
        p-8
        cursor-pointer
        hover:-translate-y-2
        hover:shadow-2xl
        transition-all
        border
        border-slate-100
      "
    >
      <div className="text-6xl mb-6">
        {icon}
      </div>

      <h3 className="text-2xl font-bold text-slate-800">
        {title}
      </h3>

      <p className="text-gray-500 mt-3">
        {description}
      </p>

      <div className="mt-5 text-blue-600 font-semibold">
        Open →
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
    <div className="bg-white rounded-3xl shadow-md p-6 border border-slate-100 hover:shadow-xl transition-all">

      <div className="flex justify-between items-center">

        <div>
          <p className="text-gray-500 text-sm">
            {title}
          </p>

          <h2 className="text-4xl font-bold text-slate-800 mt-2">
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