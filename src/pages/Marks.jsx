import { useState, useEffect } from 'react'
import {
  calculateMean,
  calculateSD,
  getRelativeGrade
} from '../utils/relativeGrading'

function Marks() {

  const [students, setStudents] = useState([])
  const [subjects, setSubjects] = useState([])

  const [marksData, setMarksData] = useState([])

  const [formData, setFormData] = useState({
    roll: '',
    subject: '',
    internal: '',
    midterm: '',
    endterm: ''
  })

  // LOAD STUDENTS
  useEffect(() => {
    const savedStudents =
      localStorage.getItem('students')

    if (savedStudents) {
      setStudents(JSON.parse(savedStudents))
    }
  }, [])

  // LOAD SUBJECTS
  useEffect(() => {
    const savedSubjects =
      localStorage.getItem('subjects')

    if (savedSubjects) {
      setSubjects(JSON.parse(savedSubjects))
    }
  }, [])

  // LOAD MARKS
  useEffect(() => {
    const savedMarks =
      localStorage.getItem('marks')

    if (savedMarks) {
      setMarksData(JSON.parse(savedMarks))
    }
  }, [])

  // SAVE MARKS
  useEffect(() => {
    localStorage.setItem(
      'marks',
      JSON.stringify(marksData)
    )
  }, [marksData])

  // HANDLE INPUT
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  // CALCULATE TOTAL
  const calculateTotal = () => {

    return (
      Number(formData.internal) +
      Number(formData.midterm) +
      Number(formData.endterm)
    )
  }

  // GRADE LOGIC
  const calculateGrade = (total) => {

    if (total >= 90) return 'A+'
    if (total >= 80) return 'A'
    if (total >= 70) return 'B+'
    if (total >= 60) return 'B'
    if (total >= 50) return 'C'

    return 'F'
  }

  // SUBMIT MARKS
  const handleSubmit = (e) => {
    e.preventDefault()

    const total = calculateTotal()

    // TEMP DATA INCLUDING CURRENT MARK
const tempMarks = [
  ...marksData,
  { total }
]

// CALCULATE MEAN
const mean =
  calculateMean(tempMarks)

// CALCULATE SD
const sd =
  calculateSD(tempMarks, mean)

// RELATIVE GRADE
const grade =
  getRelativeGrade(total, mean, sd) 

    const newMarks = {
      ...formData,
      total,
      grade
    }

    setMarksData([...marksData, newMarks])

    // RESET FORM
    setFormData({
      roll: '',
      subject: '',
      internal: '',
      midterm: '',
      endterm: ''
    })
  }

  // DELETE MARKS
  const deleteMarks = (index) => {

    const updated =
      marksData.filter((_, i) => i !== index)

    setMarksData(updated)
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-4xl font-bold text-purple-600 mb-6">
        Marks Entry
      </h1>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow mb-6"
      >

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

          {/* STUDENT */}
          <select
            name="roll"
            value={formData.roll}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          >

            <option value="">
              Select Student
            </option>

            {students.map((student, index) => (

              <option
                key={index}
                value={student.roll}
              >
                {student.roll}
              </option>

            ))}

          </select>

          {/* SUBJECT */}
          <select
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          >

            <option value="">
              Select Subject
            </option>

            {subjects.map((subject, index) => (

              <option
                key={index}
                value={subject.subject}
              >
                {subject.subject}
              </option>

            ))}

          </select>

          {/* INTERNAL */}
          <input
            type="number"
            name="internal"
            placeholder="Internal"
            value={formData.internal}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

          {/* MIDTERM */}
          <input
            type="number"
            name="midterm"
            placeholder="Midterm"
            value={formData.midterm}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

          {/* ENDTERM */}
          <input
            type="number"
            name="endterm"
            placeholder="Endterm"
            value={formData.endterm}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

        </div>

        <button
          className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg"
        >
          Save Marks
        </button>

      </form>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-hidden">

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
                Internal
              </th>

              <th className="p-4 text-left">
                Midterm
              </th>

              <th className="p-4 text-left">
                Endterm
              </th>

              <th className="p-4 text-left">
                Total
              </th>

              <th className="p-4 text-left">
                Grade
              </th>

              <th className="p-4 text-left">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {marksData.map((mark, index) => (

              <tr
                key={index}
                className="border-t"
              >

                <td className="p-4">
                  {mark.roll}
                </td>

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

                <td className="p-4 font-bold">
                  {mark.grade}
                </td>

                <td className="p-4">

                  <button
                    onClick={() => deleteMarks(index)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
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