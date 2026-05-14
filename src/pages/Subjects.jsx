import { useState, useEffect } from 'react'

function Subjects() {

  const [subjects, setSubjects] = useState([])

  const [search, setSearch] = useState('')

  const [editIndex, setEditIndex] = useState(null)

  const [formData, setFormData] = useState({
    subject: '',
    code: '',
    credits: '',
    semester: ''
  })

  // LOAD LOCAL STORAGE
  useEffect(() => {

    const savedSubjects =
      localStorage.getItem('subjects')

    if (savedSubjects) {
      setSubjects(JSON.parse(savedSubjects))
    }

  }, [])

  // SAVE LOCAL STORAGE
  useEffect(() => {

    localStorage.setItem(
      'subjects',
      JSON.stringify(subjects)
    )

  }, [subjects])

  // HANDLE INPUT
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })

  }

  // ADD / UPDATE SUBJECT
  const handleSubmit = (e) => {

    e.preventDefault()

    // DUPLICATE CODE CHECK
    const exists = subjects.find(
      (sub, index) =>
        sub.code === formData.code &&
        index !== editIndex
    )

    if (exists) {
      alert('Subject code already exists')
      return
    }

    // UPDATE
    if (editIndex !== null) {

      const updatedSubjects =
        [...subjects]

      updatedSubjects[editIndex] =
        formData

      setSubjects(updatedSubjects)

      setEditIndex(null)

    } else {

      // ADD
      setSubjects([
        ...subjects,
        formData
      ])

    }

    // RESET
    setFormData({
      subject: '',
      code: '',
      credits: '',
      semester: ''
    })
  }

  // DELETE SUBJECT
  const deleteSubject = (index) => {

    const updatedSubjects =
      subjects.filter((_, i) => i !== index)

    setSubjects(updatedSubjects)
  }

  // EDIT SUBJECT
  const editSubject = (index) => {

    setFormData(subjects[index])

    setEditIndex(index)
  }

  // SEARCH FILTER
  const filteredSubjects =
    subjects.filter((subject) =>

      subject.subject
        .toLowerCase()
        .includes(search.toLowerCase())

      ||

      subject.code
        .toLowerCase()
        .includes(search.toLowerCase())
    )

  return (

    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-4xl font-bold text-green-600 mb-6">
        Subjects
      </h1>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow mb-6"
      >

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

          {/* SUBJECT */}
          <input
            type="text"
            name="subject"
            placeholder="Subject Name"
            value={formData.subject}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

          {/* CODE */}
          <input
            type="text"
            name="code"
            placeholder="Subject Code"
            value={formData.code}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

          {/* CREDITS */}
          <input
            type="number"
            name="credits"
            placeholder="Credits"
            value={formData.credits}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

          {/* SEMESTER */}
          <input
            type="number"
            name="semester"
            placeholder="Semester"
            value={formData.semester}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

        </div>

        <button
          className={`mt-4 text-white px-6 py-3 rounded-lg ${
            editIndex !== null
              ? 'bg-yellow-500 hover:bg-yellow-600'
              : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {editIndex !== null
            ? 'Update Subject'
            : 'Add Subject'}
        </button>

      </form>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search by subject or code"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="w-full mb-4 border p-3 rounded-lg"
      />

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-200">

            <tr>

              <th className="p-4 text-left">
                Subject
              </th>

              <th className="p-4 text-left">
                Code
              </th>

              <th className="p-4 text-left">
                Credits
              </th>

              <th className="p-4 text-left">
                Semester
              </th>

              <th className="p-4 text-left">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredSubjects.length === 0 ? (

              <tr>

                <td
                  colSpan="5"
                  className="p-6 text-center text-gray-500"
                >
                  No subjects found
                </td>

              </tr>

            ) : (

              filteredSubjects.map((subject, index) => (

                <tr
                  key={index}
                  className="border-t hover:bg-gray-50"
                >

                  <td className="p-4">
                    {subject.subject}
                  </td>

                  <td className="p-4">
                    {subject.code}
                  </td>

                  <td className="p-4">
                    {subject.credits}
                  </td>

                  <td className="p-4">
                    Semester {subject.semester}
                  </td>

                  <td className="p-4 flex gap-2">

                    <button
                      onClick={() =>
                        editSubject(index)
                      }
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        deleteSubject(index)
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

export default Subjects