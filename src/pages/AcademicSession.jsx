import {
  useEffect,
  useState,
} from 'react'

import axios from 'axios'
import API_URL from '../config'

function AcademicSession() {

  const [sessions, setSessions] =
    useState([])

  const [formData, setFormData] =
    useState({
      sessionName: '',
      startDate: '',
      endDate: '',
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
    fetchSessions()
  }, [])

  const fetchSessions =
    async () => {
      const res = await axios.get(
        `${API_URL}/api/academic-sessions`,
        config
      )

      setSessions(res.data)
    }

  const submitHandler =
    async (e) => {
      e.preventDefault()

      await axios.post(
        `${API_URL}/api/academic-sessions`,
        formData,
        config
      )

      fetchSessions()

      setFormData({
        sessionName: '',
        startDate: '',
        endDate: '',
      })
    }

  const deleteSession =
    async (id) => {
      await axios.delete(
        `${API_URL}/api/academic-sessions/${id}`,
        config
      )

      fetchSessions()
    }

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Academic Sessions
      </h1>

      <form
        onSubmit={submitHandler}
        className="bg-white p-6 rounded-xl shadow mb-6"
      >

        <div className="grid md:grid-cols-3 gap-4">

          <input
            type="text"
            placeholder="2025-26"
            value={
              formData.sessionName
            }
            onChange={(e) =>
              setFormData({
                ...formData,
                sessionName:
                  e.target.value,
              })
            }
            className="border p-3 rounded"
          />

          <input
            type="date"
            value={
              formData.startDate
            }
            onChange={(e) =>
              setFormData({
                ...formData,
                startDate:
                  e.target.value,
              })
            }
            className="border p-3 rounded"
          />

          <input
            type="date"
            value={
              formData.endDate
            }
            onChange={(e) =>
              setFormData({
                ...formData,
                endDate:
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
          rounded
          "
        >
          Add Session
        </button>

      </form>

      <div className="bg-white rounded-xl shadow">

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="p-3">
                Session
              </th>

              <th className="p-3">
                Start
              </th>

              <th className="p-3">
                End
              </th>

              <th className="p-3">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {sessions.map((item) => (

              <tr
                key={item._id}
                className="border-b"
              >

                <td className="p-3">
                  {item.sessionName}
                </td>

                <td className="p-3">
                  {item.startDate?.substring(
                    0,
                    10
                  )}
                </td>

                <td className="p-3">
                  {item.endDate?.substring(
                    0,
                    10
                  )}
                </td>

                <td className="p-3">

                  <button
                    onClick={() =>
                      deleteSession(
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

export default AcademicSession