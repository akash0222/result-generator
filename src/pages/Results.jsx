import { useEffect, useState } from 'react'
import { generatePDF } from '../utils/pdfGenerator'

function Results() {

  const [students, setStudents] = useState([])
  const [subjects, setSubjects] = useState([])
  const [marksData, setMarksData] = useState([])

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
    setMarksData(savedMarks)

  }, [])

  // GRADE POINT LOGIC
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

  // CALCULATE SGPA
  const calculateSGPA = (roll) => {

    const studentMarks =
      marksData.filter(
        (mark) => mark.roll === roll
      )

    let totalCredits = 0
    let weightedPoints = 0

    studentMarks.forEach((mark) => {

      const subject =
        subjects.find(
          (sub) => sub.subject === mark.subject
        )

      if (subject) {

        const credits =
          Number(subject.credits)

        const gradePoint =
          getGradePoint(mark.grade)

        totalCredits += credits

        weightedPoints +=
          credits * gradePoint
      }

    })

    if (totalCredits === 0) {
      return 0
    }

    return (
      weightedPoints / totalCredits
    ).toFixed(2)
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-4xl font-bold text-indigo-600 mb-6">
        Results
      </h1>

      <div className="bg-white rounded-xl shadow overflow-hidden">

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

              <th className="p-4 text-left">
                Download
              </th>

            </tr>

          </thead>

          <tbody>

            {students.length === 0 ? (

              <tr>

                <td
                  colSpan="5"
                  className="p-6 text-center text-gray-500"
                >
                  No results available
                </td>

              </tr>

            ) : (

              students.map((student, index) => (

                <tr
                  key={index}
                  className="border-t hover:bg-gray-50"
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
                    {calculateSGPA(student.roll)}
                  </td>

                  <td className="p-4">

                    <button
                      onClick={() => {

                        const studentMarks =
                          marksData.filter(
                            (mark) =>
                              mark.roll === student.roll
                          )

                        generatePDF(
                          student,
                          studentMarks,
                          calculateSGPA(student.roll)
                        )
                      }}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
                    >
                      Download PDF
                    </button>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  )
}

export default Results