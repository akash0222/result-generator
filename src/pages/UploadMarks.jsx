import { useState } from 'react'
import * as XLSX from 'xlsx'
import API from '../utils/axios'

function UploadMarks() {

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  // READ EXCEL FILE
  const handleFileUpload = (e) => {

    const file = e.target.files[0]

    if (!file) return

    const reader = new FileReader()

    reader.onload = (event) => {

      const binaryStr = event.target.result

      const workbook = XLSX.read(
        binaryStr,
        {
          type: 'binary'
        }
      )

      const sheetName =
        workbook.SheetNames[0]

      const sheet =
        workbook.Sheets[sheetName]

      const jsonData =
        XLSX.utils.sheet_to_json(sheet)

      setData(jsonData)
    }

    reader.readAsBinaryString(file)
  }

  // UPLOAD MARKS
  const uploadMarks = async () => {

    if (data.length === 0) {
      alert('Please upload excel file')
      return
    }

    try {

      setLoading(true)

      for (const mark of data) {

        await API.post(
          '/api/marks',
          {
            roll: mark.roll || '',
            subject: mark.subject || '',
            internal: Number(mark.internal) || 0,
            midterm: Number(mark.midterm) || 0,
            endterm: Number(mark.endterm) || 0,
          }
        )
      }

      alert('Marks uploaded successfully')

      setData([])

    } catch (error) {

      console.log(error)

      alert(
        error.response?.data?.message ||
        'Upload failed'
      )

    } finally {

      setLoading(false)
    }
  }

  return (

    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-4xl font-bold text-purple-600 mb-6">
        Upload Marks
      </h1>

      {/* FILE UPLOAD */}
      <div className="bg-white p-6 rounded-xl shadow mb-6">

        <input
          type="file"
          accept=".xlsx,.xls"
          onChange={handleFileUpload}
          className="mb-4"
        />

        <button
          onClick={uploadMarks}
          disabled={loading}
          className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 disabled:bg-gray-400"
        >
          {
            loading
              ? 'Uploading...'
              : 'Upload Marks'
          }
        </button>

      </div>

      {/* TABLE PREVIEW */}
      {
        data.length > 0 && (

          <div className="bg-white rounded-xl shadow overflow-x-auto">

            <table className="w-full border-collapse">

              <thead className="bg-gray-200">

                <tr>

                  <th className="p-4 border">
                    Roll
                  </th>

                  <th className="p-4 border">
                    Subject
                  </th>

                  <th className="p-4 border">
                    Internal
                  </th>

                  <th className="p-4 border">
                    Midterm
                  </th>

                  <th className="p-4 border">
                    Endterm
                  </th>

                </tr>

              </thead>

              <tbody>

                {
                  data.map((mark, index) => (

                    <tr
                      key={index}
                      className="border-t"
                    >

                      <td className="p-4 border">
                        {mark.roll}
                      </td>

                      <td className="p-4 border">
                        {mark.subject}
                      </td>

                      <td className="p-4 border">
                        {mark.internal}
                      </td>

                      <td className="p-4 border">
                        {mark.midterm}
                      </td>

                      <td className="p-4 border">
                        {mark.endterm}
                      </td>

                    </tr>
                  ))
                }

              </tbody>

            </table>

          </div>
        )
      }

    </div>
  )
}

export default UploadMarks