import {
  useState
} from 'react'

import axios from 'axios'

import API_URL from '../config'

function PublishResults() {

  const [semester,
    setSemester] =
      useState('')

  // PUBLISH RESULTS
  const publish =
    async () => {

      try {

        const res =
          await axios.post(

            `${API_URL}/api/publish/publish`,

            { semester }
          )

        alert(
          res.data.message
        )

      } catch (error) {

        console.log(error)

        alert(
          error.response?.data?.message ||

          'Publish Failed'
        )
      }
    }

  // UNPUBLISH RESULTS
  const unpublish =
    async () => {

      try {

        const res =
          await axios.post(

            `${API_URL}/api/publish/unpublish`,

            { semester }
          )

        alert(
          res.data.message
        )

      } catch (error) {

        console.log(error)

        alert(
          error.response?.data?.message ||

          'Unpublish Failed'
        )
      }
    }

  return (

    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-4xl font-bold text-red-600 mb-6">
        Result Publish System
      </h1>

      <div className="bg-white p-6 rounded-xl shadow max-w-md">

        {/* SEMESTER INPUT */}
        <input

          type="number"

          placeholder="Semester"

          value={semester}

          onChange={(e) =>

            setSemester(
              e.target.value
            )
          }

          className="w-full border p-3 rounded-lg mb-4"

          required
        />

        {/* BUTTONS */}
        <div className="flex gap-4">

          {/* PUBLISH */}
          <button

            onClick={publish}

            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
          >
            Publish
          </button>

          {/* UNPUBLISH */}
          <button

            onClick={unpublish}

            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg"
          >
            Unpublish
          </button>

        </div>

      </div>

    </div>
  )
}

export default PublishResults