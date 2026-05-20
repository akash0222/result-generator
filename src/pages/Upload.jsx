import {
  useState
} from 'react'

import * as XLSX from 'xlsx'

import axios from 'axios'

import API_URL from '../config'

function Upload() {

  const [data, setData] =
    useState([])

  const [uploadType,
    setUploadType] =
      useState('students')

  const token =
    localStorage.getItem(
      'token'
    )

  // =========================
  // READ EXCEL FILE
  // =========================

  const handleFileUpload =
    (e) => {

      const file =
        e.target.files[0]

      if (!file) return

      const reader =
        new FileReader()

      reader.onload =
        (event) => {

          const binaryStr =
            event.target.result

          const workbook =
            XLSX.read(
              binaryStr,
              {
                type: 'binary'
              }
            )

          const sheetName =
            workbook.SheetNames[0]

          const sheet =
            workbook.Sheets[
              sheetName
            ]

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

  // =========================
  // DOWNLOAD TEMPLATE
  // =========================

  const downloadTemplate =
    () => {

      let templateData = []

      // STUDENTS TEMPLATE
      if (
        uploadType === 'students'
      ) {

        templateData = [

          {
            name: 'Akash',
            roll: 'PGDM001',
            course: 'PGDM',
            email:
              'akash@gmail.com'
          }
        ]
      }

      // SUBJECTS TEMPLATE
      else if (
        uploadType === 'subjects'
      ) {

        templateData = [

          {
            name:
              'Financial Management',

            code: 'FM101',

            credits: 3,

            semester: 2
          }
        ]
      }

      // MARKS TEMPLATE
      else {

        templateData = [

          {
            roll: 'PGDM001',

            subject: 'FM101',

            internal: 18,

            midterm: 20,

            endterm: 45
          }
        ]
      }

      const worksheet =
        XLSX.utils.json_to_sheet(
          templateData
        )

      const workbook =
        XLSX.utils.book_new()

      XLSX.utils.book_append_sheet(

        workbook,

        worksheet,

        'Template'
      )

      XLSX.writeFile(

        workbook,

        `${uploadType}_template.xlsx`
      )
    }

  // =========================
  // UPLOAD DATA
  // =========================

  const uploadToDatabase =
    async () => {

      try {

        // =====================
        // STUDENTS
        // =====================

        if (
          uploadType === 'students'
        ) {

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
                  student.course,

                email:
                  student.email
              },

              {
                headers: {
                  Authorization:
                    `Bearer ${token}`
                }
              }
            )
          }
        }

        // =====================
        // SUBJECTS
        // =====================

        else if (
          uploadType === 'subjects'
        ) {

          for (
            const subject of data
          ) {

            await axios.post(

              `${API_URL}/api/subjects`,

              {

                name:
                  subject.name,

                code:
                  subject.code,

                credits:
                  subject.credits,

                semester:
                  subject.semester
              },

              {
                headers: {
                  Authorization:
                    `Bearer ${token}`
                }
              }
            )
          }
        }

        // =====================
        // MARKS
        // =====================

        else {

          for (
            const mark of data
          ) {

            await axios.post(

              `${API_URL}/api/marks`,

              {

                roll:
                  mark.roll,

                subject:
                  mark.subject,

                internal:
                  mark.internal,

                midterm:
                  mark.midterm,

                endterm:
                  mark.endterm
              },

              {
                headers: {
                  Authorization:
                    `Bearer ${token}`
                }
              }
            )
          }
        }

        alert(
          `${uploadType} uploaded successfully`
        )

        setData([])

      } catch (error) {

        console.log(error)

        alert(

          error.response?.data?.message ||

          'Upload Failed'
        )
      }
    }

  return (

    <div className="min-h-screen bg-gray-100 p-6">

      {/* TITLE */}
      <h1 className="text-4xl font-bold text-orange-600 mb-6">
        Excel Upload System
      </h1>

      {/* MAIN BOX */}
      <div className="bg-white p-6 rounded-xl shadow mb-6">

        {/* SELECT TYPE */}
        <select

          value={uploadType}

          onChange={(e) =>
            setUploadType(
              e.target.value
            )
          }

          className="border p-3 rounded-lg mb-4 w-full"
        >

          <option value="students">
            Upload Students
          </option>

          <option value="subjects">
            Upload Subjects
          </option>

          <option value="marks">
            Upload Marks
          </option>

        </select>

        {/* DOWNLOAD TEMPLATE */}
        <button

          onClick={downloadTemplate}

          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg mr-4 mb-4"
        >
          Download Template
        </button>

        {/* FILE INPUT */}
        <input

          type="file"

          accept=".xlsx, .xls"

          onChange={handleFileUpload}

          className="mb-4 block"
        />

        {/* UPLOAD BUTTON */}
        <button

          onClick={uploadToDatabase}

          className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg"
        >
          Upload to Database
        </button>

      </div>

      {/* PREVIEW */}
      <div className="bg-white rounded-xl shadow overflow-auto">

        <table className="w-full">

          <thead className="bg-gray-200">

            <tr>

              {data.length > 0 &&

                Object.keys(
                  data[0]
                ).map((key) => (

                  <th
                    key={key}
                    className="p-4 text-left capitalize"
                  >
                    {key}
                  </th>
                ))}
            </tr>

          </thead>

          <tbody>

            {data.map(
              (row, index) => (

                <tr
                  key={index}
                  className="border-t"
                >

                  {Object.values(
                    row
                  ).map(
                    (
                      value,
                      i
                    ) => (

                      <td
                        key={i}
                        className="p-4"
                      >
                        {value}
                      </td>
                    )
                  )}

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