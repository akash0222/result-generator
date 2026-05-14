import { useEffect, useState } from 'react'

function RankList() {

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

  // GRADE POINTS
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

  // SGPA
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
          (sub) =>
            sub.subject === mark.subject
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

  // SORT STUDENTS BY SGPA
  const rankedStudents =
    [...students]
      .map((student) => ({
        ...student,
        sgpa: Number(
          calculateSGPA(student.roll)
        )
      }))
      .sort((a, b) => b.sgpa - a.sgpa)

  return (

    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-4xl font-bold text-yellow-600 mb-6">
        Rank List
      </h1>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-200">

            <tr>

              <th className="p-4 text-left">
                Rank
              </th>

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

            {rankedStudents.map((student, index) => (

              <tr
                key={index}
                className="border-t"
              >

                <td className="p-4 font-bold text-yellow-600">
                  #{index + 1}
                </td>

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
                  {student.sgpa}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  )
}

export default RankList