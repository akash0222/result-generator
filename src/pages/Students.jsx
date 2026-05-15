import { useState, useEffect } from 'react'
import axios from 'axios'

function Students() {

  const [students, setStudents] = useState([])

  const [search, setSearch] = useState('')

  const [formData, setFormData] = useState({
    name: '',
    roll: '',
    course: ''
  })

  const [editId, setEditId] = useState(null)

  // FETCH STUDENTS
  useEffect(() => {

    fetchStudents()

  }, [])

  // GET ALL STUDENTS
  const fetchStudents = async () => {

    try {

      const res =
        await axios.get(
          'http://localhost:5000/api/students'
        )

      setStudents(res.data)

    } catch (error) {

      console.log(error)
    }
  }

  // HANDLE INPUT
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  // ADD OR UPDATE STUDENT
  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      // UPDATE STUDENT
      if (editId) {

        const res =
          await axios.put(
            `http://localhost:5000/api/students/${editId}`,
            formData
          )

        const updatedStudents =
          students.map((student) =>

            student._id === editId
              ? res.data
              : student
          )

        setStudents(updatedStudents)

      } else {

        // ADD STUDENT
        const res =
          await axios.post(
            'http://localhost:5000/api/students',
            formData
          )

        setStudents([
          ...students,
          res.data
        ])
      }

      // RESET FORM
      setFormData({
        name: '',
        roll: '',
        course: ''
      })

      setEditId(null)

    } catch (error) {

      alert(
        error.response?.data?.message ||
        error.message
 
      )
    }
  }

  // DELETE STUDENT
  const deleteStudent = async (id) => {

    try {

      await axios.delete(
        `http://localhost:5000/api/students/${id}`
      )

      const updatedStudents =
        students.filter(
          (student) =>
            student._id !== id
        )

      setStudents(updatedStudents)

    } catch (error) {

      console.log(error)
    }
  }

  // EDIT STUDENT
  const editStudent = (student) => {

    setFormData({
      name: student.name,
      roll: student.roll,
      course: student.course
    })

    setEditId(student._id)
  }

  // SEARCH FILTER
  const filteredStudents =
    students.filter((student) =>

      student.name
        .toLowerCase()
        .includes(search.toLowerCase())

      ||

      student.roll
        .toLowerCase()
        .includes(search.toLowerCase())
    )

  return (

    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-4xl font-bold text-blue-600 mb-6">
        Students
      </h1>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow mb-6"
      >

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* NAME */}
          <input
            type="text"
            name="name"
            placeholder="Student Name"
            value={formData.name}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

          {/* ROLL */}
          <input
            type="text"
            name="roll"
            placeholder="Roll Number"
            value={formData.roll}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

          {/* COURSE */}
          <input
            type="text"
            name="course"
            placeholder="Course"
            value={formData.course}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

        </div>

        {/* BUTTON */}
        <button
          className={`mt-4 text-white px-6 py-3 rounded-lg ${
            editId
              ? 'bg-yellow-500 hover:bg-yellow-600'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >

          {editId
            ? 'Update Student'
            : 'Add Student'}

        </button>

      </form>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search Student"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="w-full border p-3 rounded-lg mb-4"
      />

      {/* TABLE */}
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
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredStudents.length === 0 ? (

              <tr>

                <td
                  colSpan="4"
                  className="p-6 text-center text-gray-500"
                >
                  No students found
                </td>

              </tr>

            ) : (

              filteredStudents.map((student) => (

                <tr
                  key={student._id}
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

                  <td className="p-4 flex gap-2">

                    {/* EDIT */}
                    <button
                      onClick={() =>
                        editStudent(student)
                      }
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
                    >
                      Edit
                    </button>

                    {/* DELETE */}
                    <button
                      onClick={() =>
                        deleteStudent(student._id)
                      }
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                    >
                      Delete
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

export default Students