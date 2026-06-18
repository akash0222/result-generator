import {

  useEffect,
  useState

} from 'react'

import axios from 'axios'

import API_URL from '../config'

function CGPA() {

  const [students, setStudents] =
    useState([])

  const [subjects, setSubjects] =
    useState([])

  const [marksData, setMarksData] =
    useState([])

  const [loading, setLoading] =
    useState(true)

  // ======================
  // LOAD DATA
  // ======================

  useEffect(() => {

    fetchData()

  }, [])

  const fetchData = async () => {

    try {

      // STUDENTS
      const studentsRes =
        await axios.get(

          `${API_URL}/api/students`
        )

      // SUBJECTS
      const subjectsRes =
        await axios.get(

          `${API_URL}/api/subjects`
        )

      // MARKS
      const marksRes =
        await axios.get(

          `${API_URL}/api/marks`
        )

      setStudents(
        studentsRes.data
      )

      setSubjects(
        subjectsRes.data
      )

      setMarksData(
        marksRes.data
      )

      setLoading(false)

    } catch (error) {

      console.log(error)

      setLoading(false)
    }
  }

  // ======================
  // GRADE POINTS
  // ======================

  const getGradePoint =
    (grade) => {

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

  // ======================
  // SEMESTER SGPA
  // ======================

  const calculateSemesterSGPA = (

    roll,
    semester

  ) => {

    // SUBJECTS OF SEMESTER
    const semesterSubjects =
      subjects.filter(

        (sub) =>

          Number(sub.semester) ===
          Number(semester)
      )

    let totalCredits = 0

    let weightedPoints = 0

    semesterSubjects.forEach((subject) => {

      // FIND MARK
      const mark =
        marksData.find(

          (m) =>

            m.roll === roll &&

            (
              m.subject ===
              subject.name ||

              m.subject ===
              subject.subject
            )
        )

      if (mark) {

        const credits =
          Number(subject.credits)

        const gradePoint =
          getGradePoint(
            mark.grade
          )

        totalCredits +=
          credits

        weightedPoints +=

          credits *
          gradePoint
      }
    })

    if (totalCredits === 0) {

      return 0
    }

    return (

      weightedPoints /
      totalCredits
    )
  }

  // ======================
  // CALCULATE CGPA
  // ======================

  const calculateCGPA =
    (roll) => {

      // UNIQUE SEMESTERS
      const semesters =

        [...new Set(

          subjects.map(

            (subject) =>

              Number(
                subject.semester
              )
          )
        )]

      let totalSGPA = 0

      let countedSemesters = 0

      semesters.forEach((semester) => {

        const sgpa =
          calculateSemesterSGPA(

            roll,
            semester
          )

        if (sgpa > 0) {

          totalSGPA += sgpa

          countedSemesters++
        }
      })

      if (countedSemesters === 0) {

        return 0
      }

      return (

        totalSGPA /
        countedSemesters

      ).toFixed(2)
    }

  // ======================
  // LOADING
  // ======================

  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center">

        <h1 className="text-3xl font-bold text-pink-600">
          Loading CGPA...
        </h1>

      </div>
    )
  }

  // ======================
  // UI
  // ======================

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

            {students.map(

              (student) => (

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

                  <td className="p-4 font-bold text-pink-600">
                    {calculateCGPA(
                      student.roll
                    )}
                  </td>

                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

    </div>
  )
}

export default CGPA