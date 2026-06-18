import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import API_URL from '../config'

function Dashboard() {

  const navigate = useNavigate()

  const [students, setStudents] = useState([])
  const [subjects, setSubjects] = useState([])
  const [marks, setMarks] = useState([])
  const [loading, setLoading] = useState(true)
  const [school, setSchool] = useState(null)

  const token = localStorage.getItem('token')

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

      const [studentRes,subjectRes, markRes, schoolRes] = 
      await Promise.all([

  axios.get(
    `${API_URL}/api/students`,
    config
  ),

  axios.get(
    `${API_URL}/api/subjects`,
    config
  ),

  axios.get(
    `${API_URL}/api/marks`,
    config
  ),

  axios.get(
    `${API_URL}/api/school-profile`,
    config
  )

])

      setStudents(
        studentRes.data.data ||
        studentRes.data ||
        []
      )

      setSubjects(
        subjectRes.data.data ||
        subjectRes.data ||
        []
      )

      setMarks(
        markRes.data.data ||
        markRes.data ||
        []
      )

      setSchool(
        schoolRes.data
      )

    } catch (error) {

      console.log(error)

    } finally {

      setLoading(false)

    }

  }

  const getGradePoint = (grade) => {

    switch (grade) {

      case 'A+':
        return 10

      case 'A':
        return 9

      case 'B+':
        return 8

      case 'B':
        return 7

      case 'C':
        return 6

      default:
        return 0

    }

  }

  const failed =
    marks.filter(
      m => m.grade === 'F'
    ).length

  const passPercentage =
    marks.length > 0
      ? (
          (
            (marks.length - failed)
            /
            marks.length
          ) * 100
        ).toFixed(2)
      : 0

  const topper =
    students.length > 0
      ? students[0]
      : null

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

    <div className="min-h-screen bg-slate-100 p-8">

      {/* HEADER */}

      <div className="text-center mb-10">

        <h1 className="text-5xl font-bold text-slate-800">

  🏫 {
    school?.schoolName ||
    'School ERP'
  }

</h1>
<p className="text-gray-500 mt-2">

  School Code :
  {
    school?.schoolCode ||
    'N/A'
  }

</p>
<p className="text-gray-500">

  Principal :
  {
    school?.principalName ||
    'N/A'
  }

</p>

        <p className="text-gray-500 mt-3">
          Student • Teacher • Academics • Examination
        </p>

      </div>

      {/* MODULES */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">

        <ERPModule
          icon="👨‍🎓"
          title="Students"
          description="Admissions & Student Records"
          onClick={() =>
            navigate('/students')
          }
        />

        <ERPModule
          icon="👩‍🏫"
          title="Teachers"
          description="Teacher Management"
          onClick={() =>
            navigate('/faculty-dashboard')
          }
        />

        <ERPModule
          icon="📚"
          title="Academics"
          description="Subjects & Curriculum"
          onClick={() =>
            navigate('/subjects')
          }
        />

        <ERPModule
          icon="📝"
          title="Examinations"
          description="Marks & Results"
          onClick={() =>
            navigate('/results')
          }
        />

        <ERPModule
          icon="📅"
          title="Attendance"
          description="Attendance Management"
          onClick={() =>
            navigate('/attendance')
          }
        />

        <ERPModule
          icon="💰"
          title="Fees"
          description="Fee Collection"
          onClick={() =>
            navigate('/fees')
          }
        />

        <ERPModule
          icon="📖"
          title="Library"
          description="Books Management"
          onClick={() =>
            navigate('/library')
          }
        />

        <ERPModule
          icon="🚌"
          title="Transport"
          description="Transport Management"
          onClick={() =>
            navigate('/transport')
          }
        />

        <ERPModule
          icon="⚙️"
          title="General"
          description="Master Data & Settings"
          onClick={() =>
            navigate('/general')
          }
        />

      </div>

      {/* QUICK STATS */}

      <div className="bg-white rounded-3xl shadow-lg p-8 mt-10">

        <h2 className="text-2xl font-bold mb-6">
          📊 Quick Statistics
        </h2>

        <div className="grid md:grid-cols-4 gap-6">

          <Stat
            title="Students"
            value={students.length}
          />

          <Stat
            title="Subjects"
            value={subjects.length}
          />

          <Stat
            title="Pass %"
            value={`${passPercentage}%`}
          />

          <Stat
            title="Topper"
            value={
              topper?.name ||
              topper?.studentName ||
              'N/A'
            }
          />

        </div>

      </div>

    </div>

  )

}

function ERPModule({
  icon,
  title,
  description,
  onClick
}) {

  return (

    <div
      onClick={onClick}
      className="
      bg-white
      rounded-3xl
      shadow-lg
      p-8
      cursor-pointer
      hover:shadow-2xl
      hover:-translate-y-2
      transition-all
      duration-300
      border
      border-gray-100
      "
    >

      <div className="text-6xl mb-4">
        {icon}
      </div>

      <h2 className="text-xl font-bold text-slate-800">
        {title}
      </h2>

      <p className="text-gray-500 mt-2">
        {description}
      </p>

    </div>

  )

}

function Stat({
  title,
  value
}) {

  return (

    <div className="bg-slate-50 rounded-2xl p-6">

      <h3 className="text-gray-500">
        {title}
      </h3>

      <p className="text-3xl font-bold mt-2">
        {value}
      </p>

    </div>

  )

}

export default Dashboard