import {
  useEffect,
  useState
} from 'react'

import axios from 'axios'

function Marks() {

  const [students,
    setStudents] =
      useState([])

  const [subjects,
    setSubjects] =
      useState([])

  const [marks,
    setMarks] =
      useState([])

  const [formData,
    setFormData] =
      useState({

        roll: '',
        subject: '',
        internal: '',
        midterm: '',
        endterm: ''
      })

  const [gradingMode,
    setGradingMode] =
      useState('absolute')

  // LOAD DATA
  useEffect(() => {

    fetchData()

  }, [])

  const fetchData =
    async () => {

      try {

        const studentsRes =
          await axios.get(
            'http://localhost:5000/api/students'
          )

        const subjectsRes =
          await axios.get(
            'http://localhost:5000/api/subjects'
          )

        const marksRes =
          await axios.get(
            'http://localhost:5000/api/marks'
          )

        setStudents(
          studentsRes.data
        )

        setSubjects(
          subjectsRes.data
        )

        setMarks(
          marksRes.data
        )

      } catch (error) {

        console.log(error)
      }
    }

  // INPUT
  const handleChange =
    (e) => {

      setFormData({

        ...formData,

        [e.target.name]:
          e.target.value
      })
    }

  // SUBMIT
  const handleSubmit =
    async (e) => {

      e.preventDefault()

      try {

        await axios.post(

          'http://localhost:5000/api/marks',

          {

            ...formData,

            gradingMode
          }
        )

        fetchData()

        setFormData({

          roll: '',
          subject: '',
          internal: '',
          midterm: '',
          endterm: ''
        })

      } catch (error) {

        console.log(error)

        alert(
          'Something went wrong'
        )
      }
    }

  // DELETE
  const deleteMark =
    async (id) => {

      try {

        await axios.delete(

          `http://localhost:5000/api/marks/${id}`
        )

        fetchData()

      } catch (error) {

        console.log(error)
      }
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

        {/* GRADING MODE */}
        <select

          value={gradingMode}

          onChange={(e) =>

            setGradingMode(
              e.target.value
            )
          }

          className="border p-3 rounded-lg mb-4"
        >

          <option value="absolute">
            Absolute Grading
          </option>

          <option value="relative">
            Relative Grading
          </option>

        </select>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

          {/* STUDENT */}
          <select

            name="roll"

            value={formData.roll}

            onChange={handleChange}

            className="border p-3 rounded"

            required
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
                  {student.roll}
                </option>
              )
            )}

          </select>

          {/* SUBJECT */}
          <select

            name="subject"

            value={formData.subject}

            onChange={handleChange}

            className="border p-3 rounded"

            required
          >

            <option value="">
              Select Subject
            </option>

            {subjects.map(
              (subject) => (

                <option
                  key={subject._id}
                  value={subject.code}
                >
                  {subject.code}
                </option>
              )
            )}

          </select>

          {/* INTERNAL */}
          <input

            type="number"

            name="internal"

            placeholder="Internal"

            value={formData.internal}

            onChange={handleChange}

            className="border p-3 rounded"

            required
          />

          {/* MIDTERM */}
          <input

            type="number"

            name="midterm"

            placeholder="Midterm"

            value={formData.midterm}

            onChange={handleChange}

            className="border p-3 rounded"

            required
          />

          {/* ENDTERM */}
          <input

            type="number"

            name="endterm"

            placeholder="Endterm"

            value={formData.endterm}

            onChange={handleChange}

            className="border p-3 rounded"

            required
          />

        </div>

        <button
          className="mt-4 bg-purple-600 text-white px-6 py-3 rounded-lg"
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

            {marks.map(
              (mark) => (

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

                  <td className="p-4 font-bold">
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
                        deleteMark(
                          mark._id
                        )
                      }

                      className="bg-red-500 text-white px-4 py-2 rounded-lg"
                    >
                      Delete
                    </button>

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

export default Marks