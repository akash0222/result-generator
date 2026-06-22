import {
  useEffect,
  useState,
} from 'react'

import axios from 'axios'

import API_URL from '../config'

function Classes() {

  const [classes, setClasses] =
    useState([])

  const [formData, setFormData] =
    useState({
      className: '',
      section: '',
      classTeacher: '',
    })

  const token =
    localStorage.getItem('token')

  const config = {
    headers: {
      Authorization:
        'Bearer ' + token,
    },
  }

  useEffect(() => {
    fetchClasses()
  }, [])

  const fetchClasses =
    async () => {
      const res = await axios.get(
        `${API_URL}/api/classes`,
        config
      )

      setClasses(res.data)
    }

  const submitHandler =
    async (e) => {
      e.preventDefault()

      await axios.post(
        `${API_URL}/api/classes`,
        formData,
        config
      )

      setFormData({
        className: '',
        section: '',
        classTeacher: '',
      })

      fetchClasses()
    }

  const deleteClass =
    async (id) => {
      await axios.delete(
        `${API_URL}/api/classes/${id}`,
        config
      )

      fetchClasses()
    }

  return (
    <div>

      <h1 className="text-3xl font-bold mb-6">
        Class Management
      </h1>

      <form
        onSubmit={submitHandler}
        className="bg-white p-6 rounded-xl shadow mb-6"
      >

        <div className="grid md:grid-cols-3 gap-4">

          <input
            type="text"
            placeholder="Class"
            value={
              formData.className
            }
            onChange={(e) =>
              setFormData({
                ...formData,
                className:
                  e.target.value,
              })
            }
            className="border p-3 rounded"
          />

          <input
            type="text"
            placeholder="Section"
            value={
              formData.section
            }
            onChange={(e) =>
              setFormData({
                ...formData,
                section:
                  e.target.value,
              })
            }
            className="border p-3 rounded"
          />

          <input
            type="text"
            placeholder="Class Teacher"
            value={
              formData.classTeacher
            }
            onChange={(e) =>
              setFormData({
                ...formData,
                classTeacher:
                  e.target.value,
              })
            }
            className="border p-3 rounded"
          />

        </div>

        <button
          className="
          mt-4
          bg-blue-600
          text-white
          px-5
          py-2
          rounded-lg
          "
        >
          Add Class
        </button>

      </form>

      <div className="bg-white rounded-xl shadow">

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="p-3">
                Class
              </th>

              <th className="p-3">
                Section
              </th>

              <th className="p-3">
                Teacher
              </th>

              <th className="p-3">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {classes.map((item) => (

              <tr
                key={item._id}
                className="border-b"
              >

                <td className="p-3">
                  {item.className}
                </td>

                <td className="p-3">
                  {item.section}
                </td>

                <td className="p-3">
                  {item.classTeacher}
                </td>

                <td className="p-3">

                  <button
                    onClick={() =>
                      deleteClass(
                        item._id
                      )
                    }
                    className="
                    bg-red-500
                    text-white
                    px-3
                    py-1
                    rounded
                    "
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

export default Classes