import {
  useEffect,
  useState
} from 'react'

import axios from 'axios'

import API_URL from '../config'

import generateGradeCard
from '../utils/generateGradeCard'

function StudentDashboard() {

  const [student,
    setStudent] =
      useState(null)

  const [marks,
    setMarks] =
      useState([])

  const roll =
    localStorage.getItem(
      'studentRoll'
    )

  // LOAD DATA
  useEffect(() => {

    fetchData()

  }, [])

  // FETCH DATA
  const fetchData =
    async () => {

      try {

        // STUDENTS
        const studentsRes =
          await axios.get(
            `${API_URL}/api/students`
          )

        // MARKS
        const marksRes =
          await axios.get(
            `${API_URL}/api/marks`
          )

        // FIND STUDENT
        const foundStudent =
          studentsRes.data.find(
            (s) =>
              s.roll === roll
          )

        setStudent(
          foundStudent
        )

        // FILTER MARKS
        const studentMarks =
          marksRes.data.filter(
            (m) =>
              m.roll === roll
          )

        setMarks(
          studentMarks
        )

      } catch (error) {

        console.log(error)
      }
    }

  // CALCULATE SGPA
  const calculateSGPA =
    () => {

      if (
        marks.length === 0
      ) {
        return 0
      }

      let total = 0

      marks.forEach((m) => {

        switch (m.grade) {

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

  // LOADING / NOT FOUND
  if (!student) {

    return (

      <div className="p-10 text-center text-red-500 text-2xl">
        Student Not Found
      </div>
    )
  }

  return (

    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-4xl font-bold text-indigo-600 mb-6">
        Student Dashboard
      </h1>

      {/* STUDENT INFO */}
      <div className="bg-white p-6 rounded-xl shadow mb-6">

        <h2 className="text-2xl font-bold mb-2">
          {student.name}
        </h2>

        <p>
          Roll: {student.roll}
        </p>

        <p>
          Course: {student.course}
        </p>

        <p className="text-xl font-bold text-indigo-600 mt-4">
          SGPA: {calculateSGPA()}
        </p>

      </div>

      {/* MARKS TABLE */}
      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-200">

            <tr>

              <th className="p-4">
                Subject
              </th>

              <th className="p-4">
                Internal
              </th>

              <th className="p-4">
                Midterm
              </th>

              <th className="p-4">
                Endterm
              </th>

              <th className="p-4">
                Total
              </th>

              <th className="p-4">
                Grade
              </th>

            </tr>

          </thead>

          <tbody>

            {marks.map((mark) => (

              <tr
                key={mark._id}
                className="border-t"
              >

                <td className="p-4">
                  {mark.subject}
                </td>

                <td className="p-4">
                  {mark.internal}
                </td>

                <td className="p-4">
                  {mark.midterm}
                </td>

                <td className="p-4">
                  {mark.endterm}
                </td>

                <td className="p-4 font-bold">
                  {mark.total}
                </td>

                <td className="p-4 font-bold text-indigo-600">
                  {mark.grade}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* DOWNLOAD PDF */}
      <button

        onClick={() =>

          generateGradeCard(

            student,

            marks,

            calculateSGPA(),

            calculateSGPA()
          )
        }

        className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg"
      >
        Download Grade Card
      </button>

    </div>
  )
}

export default StudentDashboard