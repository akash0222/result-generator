import { useEffect, useState } from 'react'
import axios from 'axios'

import API_URL from '../config'

function Marks() {

  // =========================
  // STATES
  // =========================

  const [students, setStudents] =
    useState([])

  const [subjects, setSubjects] =
    useState([])

  const [marks, setMarks] =
    useState([])

  const [roll, setRoll] =
    useState('')

  const [subject, setSubject] =
    useState('')

  const [internal, setInternal] =
    useState('')

  const [midterm, setMidterm] =
    useState('')

  const [endterm, setEndterm] =
    useState('')

  const [gradingMode, setGradingMode] =
    useState('Absolute Grading')

  // =========================
  // LOAD DATA
  // =========================

  useEffect(() => {

    fetchStudents()
    fetchSubjects()
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

      console.log(
        'Students Error:',
        error.response?.data ||
        error.message
      )
    }
  }

  // =========================
  // FETCH SUBJECTS
  // =========================

  const fetchSubjects = async () => {

    try {

      const res =
        await axios.get(

          `${API_URL}/api/subjects`,

          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        )

      setSubjects(res.data)

    } catch (error) {

      console.log(
        'Subjects Error:',
        error.response?.data ||
        error.message
      )
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

      console.log(
        'Marks Error:',
        error.response?.data ||
        error.message
      )
    }
  }

  // =========================
  // GRADE LOGIC
  // =========================

  const calculateGrade = (
    total
  ) => {

    // ABSOLUTE
    if (
      gradingMode ===
      'Absolute Grading'
    ) {

      if (total >= 90)
        return 'A+'

      if (total >= 80)
        return 'A'

      if (total >= 70)
        return 'B+'

      if (total >= 60)
        return 'B'

      if (total >= 50)
        return 'C'

      return 'F'
    }

    // RELATIVE
    else {

      if (total >= 85)
        return 'A+'

      if (total >= 75)
        return 'A'

      if (total >= 65)
        return 'B+'

      if (total >= 55)
        return 'B'

      if (total >= 45)
        return 'C'

      return 'F'
    }
  }

  // =========================
  // SAVE MARKS
  // =========================

  const saveMarks = async () => {

    try {

      const total =

        Number(internal) +
        Number(midterm) +
        Number(endterm)

      const grade =
        calculateGrade(total)

      await axios.post(

        `${API_URL}/api/marks`,

        {
          roll,
          subject,
          internal,
          midterm,
          endterm,
          total,
          grade,
          gradingMode
        },

        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      )

      alert(
        'Marks saved successfully'
      )

      // RESET
      setRoll('')
      setSubject('')
      setInternal('')
      setMidterm('')
      setEndterm('')

      fetchMarks()

    } catch (error) {

      console.log(error)

      alert(
        error.response?.data?.message ||
        'Something went wrong'
      )
    }
  }

  // =========================
  // DELETE MARKS
  // =========================

  const deleteMarks = async (
    id
  ) => {

    try {

      await axios.delete(

        `${API_URL}/api/marks/${id}`,

        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      )

      fetchMarks()

    } catch (error) {

      console.log(error)
    }
  }

  return (

    <div className="min-h-screen bg-gray-100 p-6">

      {/* HEADER */}
      <h1 className="text-5xl font-bold text-purple-600 mb-8">
        Marks Entry
      </h1>

      {/* FORM */}
      <div className="bg-white p-6 rounded-2xl shadow mb-8">

        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">

          {/* GRADING MODE */}
          <select
            value={gradingMode}
            onChange={(e) =>
              setGradingMode(
                e.target.value
              )
            }
            className="border p-3 rounded-lg"
          >

            <option>
              Absolute Grading
            </option>

            <option>
              Relative Grading
            </option>

          </select>

          {/* STUDENTS */}
          <select
            value={roll}
            onChange={(e) =>
              setRoll(
                e.target.value
              )
            }
            className="border p-3 rounded-lg"
          >

            <option value="">
              Select Student
            </option>

            {students.map(
              (student) => (

                <option
                  key={student._id}
                  value={student.roll}
                >
                  {student.name}
                  {' '}
                  (
                  {student.roll}
                  )
                </option>
              )
            )}

          </select>

          {/* SUBJECTS */}
          <select
            value={subject}
            onChange={(e) =>
              setSubject(
                e.target.value
              )
            }
            className="border p-3 rounded-lg"
          >

            <option value="">
              Select Subject
            </option>

            {subjects.map(
              (sub) => (

                <option
                  key={sub._id}
                  value={sub.name}
                >
                  {sub.name}
                </option>
              )
            )}

          </select>

          {/* INTERNAL */}
          <input
            type="number"
            placeholder="Internal"
            value={internal}
            onChange={(e) =>
              setInternal(
                e.target.value
              )
            }
            className="border p-3 rounded-lg"
          />

          {/* MIDTERM */}
          <input
            type="number"
            placeholder="Midterm"
            value={midterm}
            onChange={(e) =>
              setMidterm(
                e.target.value
              )
            }
            className="border p-3 rounded-lg"
          />

          {/* ENDTERM */}
          <input
            type="number"
            placeholder="Endterm"
            value={endterm}
            onChange={(e) =>
              setEndterm(
                e.target.value
              )
            }
            className="border p-3 rounded-lg"
          />

        </div>

        {/* BUTTON */}
        <button
          onClick={saveMarks}
          className="mt-6 bg-purple-600 text-white px-6 py-3 rounded-lg"
        >
          Save Marks
        </button>

      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-200">

            <tr>

              <th className="p-4 text-left">
                Roll
              </th>

              <th className="p-4 text-left">
                Subject
              </th>

              <th className="p-4 text-left">
                Total
              </th>

              <th className="p-4 text-left">
                Grade
              </th>

              <th className="p-4 text-left">
                Mode
              </th>

              <th className="p-4 text-left">
                Action
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
                  {mark.roll}
                </td>

                <td className="p-4">
                  {mark.subject}
                </td>

                <td className="p-4">
                  {mark.total}
                </td>

                <td className="p-4 font-bold text-purple-600">
                  {mark.grade}
                </td>

                <td className="p-4">
                  {mark.gradingMode}
                </td>

                <td className="p-4">

                  <button
                    onClick={() =>
                      deleteMarks(
                        mark._id
                      )
                    }
                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  )
}

export default Marks