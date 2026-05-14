import { useEffect, useState } from 'react'

function Dashboard() {

  const [students, setStudents] = useState([])
  const [subjects, setSubjects] = useState([])
  const [marks, setMarks] = useState([])

  // LOAD DATA
  useEffect(() => {

    const savedStudents =
      JSON.parse(localStorage.getItem('students')) || []

    const savedSubjects =
      JSON.parse(localStorage.getItem('subjects')) || []

    const savedMarks =
      JSON.parse(localStorage.getItem('marks')) || []

    setStudents(savedStudents)
    setSubjects(savedSubjects)
    setMarks(savedMarks)

  }, [])

  // CALCULATE AVERAGE SGPA
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

  return (

    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-4xl font-bold text-blue-600 mb-6">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        {/* TOTAL STUDENTS */}
        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="text-gray-500 text-lg">
            Total Students
          </h2>

          <p className="text-4xl font-bold text-blue-600 mt-2">
            {students.length}
          </p>

        </div>

        {/* TOTAL SUBJECTS */}
        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="text-gray-500 text-lg">
            Total Subjects
          </h2>

          <p className="text-4xl font-bold text-green-600 mt-2">
            {subjects.length}
          </p>

        </div>

        {/* TOTAL MARKS */}
        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="text-gray-500 text-lg">
            Marks Entries
          </h2>

          <p className="text-4xl font-bold text-purple-600 mt-2">
            {marks.length}
          </p>

        </div>

        {/* AVERAGE SGPA */}
        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="text-gray-500 text-lg">
            Average GPA
          </h2>

          <p className="text-4xl font-bold text-indigo-600 mt-2">
            {calculateAverageSGPA()}
          </p>

        </div>

      </div>

    </div>
  )
}

export default Dashboard