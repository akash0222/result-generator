import { useEffect, useState } from 'react'
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

  const fetchSessions = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/api/academic-sessions`,
        config
      )

      setSessions(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const submitHandler = async (e) => {
    e.preventDefault()

    try {
      await axios.post(
        `${API_URL}/api/academic-sessions`,
        formData,
        config
      )

      setFormData({
        sessionName: '',
        startDate: '',
        endDate: '',
      })

      fetchSessions()
    } catch (error) {
      alert(
        error.response?.data?.message
      )
    }
  }

  const setActive = async (id) => {
    try {
      await axios.put(
        `${API_URL}/api/academic-sessions/active/${id}`,
        {},
        config
      )

      fetchSessions()
    } catch (error) {
      console.log(error)
    }
  }

  const deleteSession = async (
    id
  ) => {
    if (
      !window.confirm(
        'Delete Session?'
      )
    )
      return

    try {
      await axios.delete(
        `${API_URL}/api/academic-sessions/${id}`,
        config
      )

      fetchSessions()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="p-8">

      <h1 className="text-4xl font-bold mb-8">
        Academic Sessions
      </h1>

      <form
        onSubmit={submitHandler}
        className="bg-white p-6 rounded-3xl shadow-lg mb-8"
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
            className="border p-3 rounded-xl"
            required
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
            className="border p-3 rounded-xl"
            required
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
            className="border p-3 rounded-xl"
            required
          />

        </div>

        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-xl"
        >
          Add Session
        </button>

      </form>

      <div className="bg-white rounded-3xl shadow-lg overflow-hidden">

        <table className="w-full">

          <thead>

            <tr className="bg-gray-100">

              <th className="p-4">
                Session
              </th>

              <th className="p-4">
                Start
              </th>

              <th className="p-4">
                End
              </th>

              <th className="p-4">
                Status
              </th>

              <th className="p-4">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {sessions.map(
              (session) => (
                <tr
                  key={session._id}
                  className="border-t"
                >
                  <td className="p-4">
                    {
                      session.sessionName
                    }
                  </td>

                  <td className="p-4">
                    {new Date(
                      session.startDate
                    )
                      .toISOString()
                      .split('T')[0]}
                  </td>

                  <td className="p-4">
                    {new Date(
                      session.endDate
                    )
                      .toISOString()
                      .split('T')[0]}
                  </td>

                  <td className="p-4">

                    {session.isActive ? (
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full">
                        Active
                      </span>
                    ) : (
                      <span className="bg-gray-300 px-3 py-1 rounded-full">
                        Inactive
                      </span>
                    )}

                  </td>

                  <td className="p-4 flex gap-2">

                    {!session.isActive && (
                      <button
                        onClick={() =>
                          setActive(
                            session._id
                          )
                        }
                        className="bg-blue-600 text-white px-3 py-2 rounded"
                      >
                        Set Active
                      </button>
                    )}

                    <button
                      onClick={() =>
                        deleteSession(
                          session._id
                        )
                      }
                      className="bg-red-500 text-white px-3 py-2 rounded"
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

export default AcademicSession