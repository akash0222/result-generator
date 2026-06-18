import {

  useEffect,
  useState

} from 'react'

import axios from 'axios'

import API_URL from '../config'

function RankList() {

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
  // CALCULATE SGPA
  // ======================

  const calculateSGPA =
    (roll) => {

      const studentMarks =
        marksData.filter(

          (mark) =>
            mark.roll === roll
        )

      let totalCredits = 0

      let weightedPoints = 0

      studentMarks.forEach((mark) => {

        const subject =
          subjects.find(

            (sub) =>

              sub.name ===
              mark.subject ||

              sub.subject ===
              mark.subject
          )

        if (subject) {

          const credits =
            Number(
              subject.credits
            )

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

      ).toFixed(2)
    }

  // ======================
  // RANK STUDENTS
  // ======================

  const rankedStudents =

    [...students]

      .map((student) => ({

        ...student,

        sgpa: Number(

          calculateSGPA(
            student.roll
          )
        )
      }))

      .sort(

        (a, b) =>

          b.sgpa - a.sgpa
      )

  // ======================
  // LOADING
  // ======================

  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center">

        <h1 className="text-3xl font-bold text-indigo-600">
          Loading Rank List...
        </h1>

      </div>
    )
  }

  // ======================
  // UI
  // ======================

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

            {rankedStudents.map(

              (student, index) => (

                <tr
                  key={student._id}
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
              )
            )}

          </tbody>

        </table>

      </div>

    </div>
  )
}

export default RankList