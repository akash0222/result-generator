import { useEffect, useState } from 'react'
import axios from 'axios'

import API_URL from '../config'

function Results() {

  const [students, setStudents] =
    useState([])

  const [marks, setMarks] =
    useState([])

  // =========================
  // LOAD DATA
  // =========================

  useEffect(() => {

    fetchStudents()
    fetchMarks()

  }, [])

  // =========================
  // TOKEN
  // =========================

  const token =
    localStorage.getItem('token')

  // =========================
  // FETCH STUDENTS
  // =========================

  const fetchStudents = async () => {

    try {

      const res =
        await axios.get(

          `${API_URL}/api/students`,

          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        )

      setStudents(res.data)

    } catch (error) {

      console.log(error)
    }
  }

  // =========================
  // FETCH MARKS
  // =========================

  const fetchMarks = async () => {

    try {

      const res =
        await axios.get(

          `${API_URL}/api/marks`,

          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        )

      setMarks(res.data)

    } catch (error) {

      console.log(error)
    }
  }

  // =========================
  // SGPA CALCULATION
  // =========================

  const calculateSGPA = (
    roll
  ) => {

    const studentMarks =
      marks.filter(
        (m) => m.roll === roll
      )

    if (
      studentMarks.length === 0
    ) {

      return 0
    }

    let total = 0

    studentMarks.forEach((m) => {

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
      total /
      studentMarks.length
    ).toFixed(2)
  }

  return (

    <div className="min-h-screen bg-gray-100 p-6">

      {/* HEADER */}
      <h1 className="text-5xl font-bold text-indigo-600 mb-8">
        Results
      </h1>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-200">

            <tr>

              <th className="p-4 text-left">
                Name
              </th>

              <th className="p-4 text-left">
                Roll
              </th>

              <th className="p-4 text-left">
                Course
              </th>

              <th className="p-4 text-left">
                SGPA
              </th>

            </tr>

          </thead>

          <tbody>

            {students.map((student) => (

              <tr
                key={student._id}
                className="border-t"
              >

                <td className="p-4">
                  {student.name}
                </td>

                <td className="p-4">
                  {student.roll}
                </td>

                <td className="p-4">
                  {student.course}
                </td>

                <td className="p-4 font-bold text-indigo-600">
                  {
                    calculateSGPA(
                      student.roll
                    )
                  }
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  )
}

export default Results