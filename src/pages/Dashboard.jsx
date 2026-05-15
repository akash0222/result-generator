import { useEffect, useState } from 'react'
import axios from 'axios'

function Dashboard() {

  const [students, setStudents] = useState([])
  const [subjects, setSubjects] = useState([])
  const [marks, setMarks] = useState([])

  // LOAD API DATA
  useEffect(() => {

    fetchStudents()
    fetchSubjects()
    fetchMarks()

  }, [])

  // FETCH STUDENTS
  const fetchStudents = async () => {

    try {

      const res =
        await axios.get(
          'http://localhost:5000/api/students'
        )

      setStudents(res.data)

    } catch (error) {

      console.log(error)
    }
  }

  // FETCH SUBJECTS
  const fetchSubjects = async () => {

    try {

      const savedSubjects =
        JSON.parse(
          localStorage.getItem('subjects')
        ) || []

      setSubjects(savedSubjects)

    } catch (error) {

      console.log(error)
    }
  }

  // FETCH MARKS
  const fetchMarks = async () => {

    try {

      const savedMarks =
        JSON.parse(
          localStorage.getItem('marks')
        ) || []

      setMarks(savedMarks)

    } catch (error) {

      console.log(error)
    }
  }

  // GPA CALCULATION
  const calculateAverageSGPA = () => {

    if (marks.length === 0) {
      return 0
    }

    let total = 0

    marks.forEach((mark) => {

      switch (mark.grade) {

        case 'A+':
          total += 10
          break

        case 'A':
          total += 9
          break

        case 'B+':
          total += 8
          break

        case 'B':
          total += 7
          break

        case 'C':
          total += 6
          break

        default:
          total += 0
      }

    })

    return (
      total / marks.length
    ).toFixed(2)
  }

  // FAILED
  const failedStudents =
    marks.filter(
      (m) => m.grade === 'F'
    ).length

  // PASS %
  const passPercentage =
    marks.length > 0

      ? (
          (
            (
              marks.length -
              failedStudents
            ) / marks.length
          ) * 100
        ).toFixed(2)

      : 0

  return (

    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-5xl font-bold text-blue-600 mb-8">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        {/* STUDENTS */}
        <div className="bg-white p-6 rounded-2xl shadow">

          <h2 className="text-gray-500 text-lg">
            Total Students
          </h2>

          <p className="text-5xl font-bold text-blue-600 mt-3">
            {students.length}
          </p>

        </div>

        {/* SUBJECTS */}
        <div className="bg-white p-6 rounded-2xl shadow">

          <h2 className="text-gray-500 text-lg">
            Total Subjects
          </h2>

          <p className="text-5xl font-bold text-green-600 mt-3">
            {subjects.length}
          </p>

        </div>

        {/* MARKS */}
        <div className="bg-white p-6 rounded-2xl shadow">

          <h2 className="text-gray-500 text-lg">
            Marks Entries
          </h2>

          <p className="text-5xl font-bold text-purple-600 mt-3">
            {marks.length}
          </p>

        </div>

        {/* GPA */}
        <div className="bg-white p-6 rounded-2xl shadow">

          <h2 className="text-gray-500 text-lg">
            Average GPA
          </h2>

          <p className="text-5xl font-bold text-indigo-600 mt-3">
            {calculateAverageSGPA()}
          </p>

        </div>

      </div>

      {/* SECOND ROW */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">

        {/* FAILED */}
        <div className="bg-white p-6 rounded-2xl shadow">

          <h2 className="text-gray-500 text-lg">
            Failed Students
          </h2>

          <p className="text-5xl font-bold text-red-600 mt-3">
            {failedStudents}
          </p>

        </div>

        {/* PASS */}
        <div className="bg-white p-6 rounded-2xl shadow">

          <h2 className="text-gray-500 text-lg">
            Pass Percentage
          </h2>

          <p className="text-5xl font-bold text-green-600 mt-3">
            {passPercentage}%
          </p>

        </div>

      </div>

    </div>
  )
}

export default Dashboard