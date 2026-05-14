import { useState, useEffect } from 'react'

function Students() {

  const [students, setStudents] = useState([])

  const [search, setSearch] = useState('')

  const [formData, setFormData] = useState({
    name: '',
    roll: '',
    course: ''
  })

  const [editIndex, setEditIndex] = useState(null)

  // LOAD LOCAL STORAGE
  useEffect(() => {
    const savedStudents = localStorage.getItem('students')

    if (savedStudents) {
      setStudents(JSON.parse(savedStudents))
    }
  }, [])

  // SAVE LOCAL STORAGE
  useEffect(() => {
    localStorage.setItem(
      'students',
      JSON.stringify(students)
    )
  }, [students])

  // HANDLE INPUT
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  // ADD OR UPDATE STUDENT
  const handleSubmit = (e) => {
    e.preventDefault()

    // CHECK DUPLICATE ROLL NUMBER
    const exists = students.find(
      (student, index) =>
        student.roll === formData.roll &&
        index !== editIndex
    )

    if (exists) {
      alert('Roll number already exists')
      return
    }

    // UPDATE STUDENT
    if (editIndex !== null) {

      const updatedStudents = [...students]

      updatedStudents[editIndex] = formData

      setStudents(updatedStudents)

      setEditIndex(null)

    } else {

      // ADD NEW STUDENT
      setStudents([...students, formData])

    }

    // RESET FORM
    setFormData({
      name: '',
      roll: '',
      course: ''
    })
  }

  // DELETE STUDENT
  const deleteStudent = (index) => {

    const updatedStudents =
      students.filter((_, i) => i !== index)

    setStudents(updatedStudents)
  }

  // EDIT STUDENT
  const editStudent = (index) => {

    setFormData(students[index])

    setEditIndex(index)
  }

  // SEARCH FILTER
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase()) ||
    student.roll.toLowerCase().includes(search.toLowerCase())
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

          <input
            type="text"
            name="name"
            placeholder="Student Name"
            value={formData.name}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

          <input
            type="text"
            name="roll"
            placeholder="Roll Number"
            value={formData.roll}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

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

        <button
          className={`mt-4 text-white px-6 py-3 rounded-lg ${
            editIndex !== null
              ? 'bg-yellow-500 hover:bg-yellow-600'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {editIndex !== null
            ? 'Update Student'
            : 'Add Student'}
        </button>

      </form>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search by name or roll number"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-4 border p-3 rounded-lg"
      />

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-200">

            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Roll</th>
              <th className="p-4 text-left">Course</th>
              <th className="p-4 text-left">Actions</th>
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

              filteredStudents.map((student, index) => (

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

                  <td className="p-4 flex gap-2">

                    <button
                      onClick={() => editStudent(index)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteStudent(index)}
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