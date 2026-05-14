import { useEffect, useState } from 'react'

function CGPA() {

  const [students, setStudents] = useState([])
  const [subjects, setSubjects] = useState([])
  const [marksData, setMarksData] = useState([])

  useEffect(() => {

    setStudents(
      JSON.parse(localStorage.getItem('students')) || []
    )

    setSubjects(
      JSON.parse(localStorage.getItem('subjects')) || []
    )

    setMarksData(
      JSON.parse(localStorage.getItem('marks')) || []
    )

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

  // CALCULATE SEMESTER SGPA
  const calculateSemesterSGPA = (
    roll,
    semester
  ) => {

    const semesterSubjects =
      subjects.filter(
        (sub) =>
          Number(sub.semester) === semester
      )

    let totalCredits = 0
    let weightedPoints = 0

    semesterSubjects.forEach((subject) => {

      const mark =
        marksData.find(
          (m) =>
            m.roll === roll &&
            m.subject === subject.subject
        )

      if (mark) {

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
    )
  }

  // CALCULATE CGPA
  const calculateCGPA = (roll) => {

    const semesters =
      [...new Set(
        subjects.map(
          (subject) =>
            Number(subject.semester)
        )
      )]

    let totalSGPA = 0

    semesters.forEach((semester) => {

      totalSGPA +=
        calculateSemesterSGPA(
          roll,
          semester
        )

    })

    return (
      totalSGPA / semesters.length
    ).toFixed(2)
  }

  return (

    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-4xl font-bold text-pink-600 mb-6">
        CGPA Results
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
                CGPA
              </th>

            </tr>

          </thead>

          <tbody>

            {students.map((student, index) => (

              <tr
                key={index}
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

                <td className="p-4 font-bold text-pink-600">
                  {calculateCGPA(student.roll)}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  )
}

export default CGPA