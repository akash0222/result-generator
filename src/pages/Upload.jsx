import { useState } from 'react'
import { readExcelFile } from '../utils/excelReader'

function Upload() {
  const [data, setData] = useState([])

  const handleFile = (e) => {
    const file = e.target.files[0]

    readExcelFile(file, (rows) => {
      setData(rows)
    })
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">
        Upload Excel File
      </h1>

      <input
        type="file"
        accept=".xlsx,.xls"
        onChange={handleFile}
      />

      <div className="mt-6">
        <pre>
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    </div>
  )
}

export default Upload
