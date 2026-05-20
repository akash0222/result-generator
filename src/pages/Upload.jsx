import {
  useState
} from 'react'

import * as XLSX from 'xlsx'

import axios from 'axios'

import API_URL from '../config'

function Upload() {

  const [data,
    setData] =
      useState([])

  // READ EXCEL FILE
  const handleFileUpload =
    async (e) => {

      const file =
        e.target.files[0]

      if (!file) {
        return
      }

      const reader =
        new FileReader()

      reader.onload =
        async (event) => {

          const binaryStr =
            event.target.result

          // READ WORKBOOK
          const workbook =
            XLSX.read(
              binaryStr,
              {
                type: 'binary'
              }
            )

          // FIRST SHEET
          const sheetName =
            workbook.SheetNames[0]

          const sheet =
            workbook.Sheets[
              sheetName
            ]

          // CONVERT TO JSON
          const jsonData =
            XLSX.utils.sheet_to_json(
              sheet
            )

          setData(jsonData)
        }

      reader.readAsBinaryString(
        file
      )
    }

  // SAVE TO DATABASE
  const uploadToDatabase =
    async () => {

      try {

        for (
          const student of data
        ) {

          await axios.post(

            `${API_URL}/api/students`,

            {

              name:
                student.name,

              roll:
                student.roll,

              course:
                student.course
            }
          )
        }

        alert(
          'Excel data uploaded successfully'
        )

      } catch (error) {

        console.log(error)

        alert(

          error.response?.data?.message ||

          'Upload failed'
        )
      }
    }

  return (

    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-4xl font-bold text-orange-600 mb-6">
        Excel Upload
      </h1>

      {/* UPLOAD BOX */}
      <div className="bg-white p-6 rounded-xl shadow mb-6">

        <input

          type="file"

          accept=".xlsx, .xls"

          onChange={handleFileUpload}

          className="mb-4"
        />

        <button

          onClick={uploadToDatabase}

          className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg"
        >
          Upload to Database
        </button>

      </div>

      {/* PREVIEW TABLE */}
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

            </tr>

          </thead>

          <tbody>

            {data.map(
              (student, index) => (

                <tr
                  key={index}
                  className="border-t"
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

                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

    </div>
  )
}

export default Upload