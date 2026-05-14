import { useState, useEffect } from 'react'

function Subjects() {

  const [subjects, setSubjects] = useState([])

  const [formData, setFormData] = useState({
    subject: '',
    code: '',
    credits: ''
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

  // ADD SUBJECT
  const handleSubmit = (e) => {
    e.preventDefault()

    setSubjects([...subjects, formData])

    setFormData({
      subject: '',
      code: '',
      credits: ''
    })
  }

  // DELETE SUBJECT
  const deleteSubject = (index) => {

    const updatedSubjects =
      subjects.filter((_, i) => i !== index)

    setSubjects(updatedSubjects)
  }

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <input
            type="text"
            name="subject"
            placeholder="Subject Name"
            value={formData.subject}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

          <input
            type="text"
            name="code"
            placeholder="Subject Code"
            value={formData.code}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

          <input
            type="number"
            name="credits"
            placeholder="Credits"
            value={formData.credits}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

        </div>

        <button
          className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
        >
          Add Subject
        </button>

      </form>

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
                Action
              </th>
            </tr>

          </thead>

          <tbody>

            {subjects.length === 0 ? (

              <tr>
                <td
                  colSpan="4"
                  className="p-6 text-center text-gray-500"
                >
                  No subjects added
                </td>
              </tr>

            ) : (

              subjects.map((subject, index) => (

                <tr
                  key={index}
                  className="border-t"
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

                    <button
                      onClick={() => deleteSubject(index)}
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