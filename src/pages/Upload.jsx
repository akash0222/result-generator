import { useState } from 'react'
import * as XLSX from 'xlsx'

function Upload() {

  const [data, setData] = useState([])

  // HANDLE FILE
  const handleFileUpload = (e) => {

    const file = e.target.files[0]

    const reader = new FileReader()

    reader.onload = (event) => {

      const binaryString =
        event.target.result

      const workbook =
        XLSX.read(binaryString, {
          type: 'binary'
        })

      const sheetName =
        workbook.SheetNames[0]

      const worksheet =
        workbook.Sheets[sheetName]

      const excelData =
        XLSX.utils.sheet_to_json(worksheet)

      setData(excelData)

      // SAVE TO LOCAL STORAGE
      localStorage.setItem(
        'students',
        JSON.stringify(excelData)
      )
    }

    reader.readAsBinaryString(file)
  }

  return (

    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-4xl font-bold text-orange-600 mb-6">
        Excel Upload
      </h1>

      {/* FILE INPUT */}
      <div className="bg-white p-6 rounded-xl shadow mb-6">

        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileUpload}
          className="border p-3 rounded-lg"
        />

      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-200">

            <tr>

              {data.length > 0 &&
                Object.keys(data[0]).map((key) => (

                  <th
                    key={key}
                    className="p-4 text-left"
                  >
                    {key}
                  </th>

                ))}

            </tr>

          </thead>

          <tbody>

            {data.map((row, index) => (

              <tr
                key={index}
                className="border-t"
              >

                {Object.values(row).map((value, i) => (

                  <td
                    key={i}
                    className="p-4"
                  >
                    {value}
                  </td>

                ))}

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  )
}

export default Upload