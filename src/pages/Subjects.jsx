import { useState, useEffect } from 'react'

import axios from 'axios'

import API_URL from '../config'

function Subjects() {

  const [subjects, setSubjects] =
    useState([])

  const [search, setSearch] =
    useState('')

  const [editId, setEditId] =
    useState(null)

  const [formData, setFormData] =
    useState({

      name: '',

      code: '',

      credits: '',

      semester: ''
    })

  // LOAD SUBJECTS
  useEffect(() => {

    fetchSubjects()

  }, [])

  // FETCH SUBJECTS
  const fetchSubjects =
    async () => {

      try {

        const res =
          await axios.get(
            `${API_URL}/api/subjects`
          )

        setSubjects(
          res.data
        )

      } catch (error) {

        console.log(error)
      }
    }

  // HANDLE INPUT
  const handleChange =
    (e) => {

      setFormData({

        ...formData,

        [e.target.name]:
          e.target.value
      })
    }

  // ADD / UPDATE SUBJECT
  const handleSubmit =
    async (e) => {

      e.preventDefault()

      try {

        // UPDATE
        if (editId) {

          await axios.put(

            `${API_URL}/api/subjects/${editId}`,

            formData
          )

          setEditId(null)

        } else {

          // ADD
          await axios.post(

            `${API_URL}/api/subjects`,

            formData
          )
        }

        // RESET
        setFormData({

          name: '',

          code: '',

          credits: '',

          semester: ''
        })

        // REFRESH
        fetchSubjects()

      } catch (error) {

        console.log(error)

        alert(

          error.response?.data?.message ||

          'Something went wrong'
        )
      }
    }

  // DELETE SUBJECT
  const deleteSubject =
    async (id) => {

      try {

        await axios.delete(

          `${API_URL}/api/subjects/${id}`
        )

        fetchSubjects()

      } catch (error) {

        console.log(error)
      }
    }

  // EDIT SUBJECT
  const editSubject =
    (subject) => {

      setFormData({

        name:
          subject.name,

        code:
          subject.code,

        credits:
          subject.credits,

        semester:
          subject.semester
      })

      setEditId(
        subject._id
      )
    }

  // SEARCH FILTER
  const filteredSubjects =
    subjects.filter((subject) =>

      subject.name
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )

      ||

      subject.code
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )
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

          {/* SUBJECT NAME */}
          <input

            type="text"

            name="name"

            placeholder="Subject Name"

            value={formData.name}

            onChange={handleChange}

            className="border p-3 rounded-lg"

            required
          />

          {/* SUBJECT CODE */}
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

        {/* BUTTON */}
        <button

          className={`mt-4 text-white px-6 py-3 rounded-lg ${
            editId
              ? 'bg-yellow-500 hover:bg-yellow-600'
              : 'bg-green-600 hover:bg-green-700'
          }`}
        >

          {editId

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
          setSearch(
            e.target.value
          )
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

              filteredSubjects.map((subject) => (

                <tr

                  key={subject._id}

                  className="border-t hover:bg-gray-50"
                >

                  <td className="p-4">
                    {subject.name}
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

                    {/* EDIT */}
                    <button

                      onClick={() =>
                        editSubject(subject)
                      }

                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
                    >
                      Edit
                    </button>

                    {/* DELETE */}
                    <button

                      onClick={() =>
                        deleteSubject(
                          subject._id
                        )
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