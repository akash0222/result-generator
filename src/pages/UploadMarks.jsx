import { useState } from 'react'
import * as XLSX from 'xlsx'
import axios from 'axios'

function UploadMarks() {

  const [data, setData] =
    useState([])

  // READ FILE
  const handleFileUpload = (
    e
  ) => {

    const file =
      e.target.files[0]

    const reader =
      new FileReader()

    reader.onload = (
      event
    ) => {

      const binaryStr =
        event.target.result

      const workbook =
        XLSX.read(
          binaryStr,
          { type: 'binary' }
        )

      const sheetName =
        workbook.SheetNames[0]

      const sheet =
        workbook.Sheets[sheetName]

      const jsonData =
        XLSX.utils.sheet_to_json(
          sheet
        )

      setData(jsonData)
    }

    reader.readAsBinaryString(file)
  }

  // SAVE
  const uploadMarks = async () => {

    try {

      for (const mark of data) {

        await axios.post(
          '${API_URL}/api/marks',
          {
            roll: mark.roll,
            subject: mark.subject,
            internal: mark.internal,
            midterm: mark.midterm,
            endterm: mark.endterm
          }
        )
      }

      alert(
        'Marks uploaded successfully'
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

      <h1 className="text-4xl font-bold text-purple-600 mb-6">
        Upload Marks
      </h1>

      <div className="bg-white p-6 rounded-xl shadow mb-6">

        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileUpload}
          className="mb-4"
        />

        <button
          onClick={uploadMarks}
          className="bg-purple-600 text-white px-6 py-3 rounded-lg"
        >
          Upload Marks
        </button>

      </div>

      {/* PREVIEW */}
      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-200">

            <tr>

              <th className="p-4">
                Roll
              </th>

              <th className="p-4">
                Subject
              </th>

              <th className="p-4">
                Internal
              </th>

              <th className="p-4">
                Midterm
              </th>

              <th className="p-4">
                Endterm
              </th>

            </tr>

          </thead>

          <tbody>

            {data.map((mark, index) => (

              <tr
                key={index}
                className="border-t"
              >

                <td className="p-4">
                  {mark.roll}
                </td>

                <td className="p-4">
                  {mark.subject}
                </td>

                <td className="p-4">
                  {mark.internal}
                </td>

                <td className="p-4">
                  {mark.midterm}
                </td>

                <td className="p-4">
                  {mark.endterm}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  )
}

export default UploadMarks