import { useEffect, useState } from 'react'
import axios from 'axios'

import generateGradeCard
from '../utils/generateGradeCard'

import JSZip from 'jszip'
import { saveAs } from 'file-saver'

function Results() {

  const [students, setStudents] =
    useState([])

  const [marks, setMarks] =
    useState([])

  useEffect(() => {

    fetchData()

  }, [])

  // FETCH DATA
  const fetchData = async () => {

    try {

      const studentsRes =
        await axios.get(
          'http://localhost:5000/api/students'
        )

      const marksRes =
        await axios.get(
          'http://localhost:5000/api/marks'
        )

      setStudents(studentsRes.data)

      setMarks(marksRes.data)

    } catch (error) {

      console.log(error)
    }
  }

  // CALCULATE SGPA
  const calculateSGPA = (roll) => {

    const studentMarks =
      marks.filter(
        (m) => m.roll === roll
      )

    if (studentMarks.length === 0)
      return 0

    let total = 0

    studentMarks.forEach((m) => {

      switch (m.grade) {

        case 'A+':

          total += 10
          break

        case 'A':

          total += 9
          break

        case 'B+':

          total += 8
          break

        case 'B':

          total += 7
          break

        case 'C':

          total += 6
          break

        default:

          total += 0
      }
    })

    return (
      total /
      studentMarks.length
    ).toFixed(2)
  }

  // SINGLE PDF DOWNLOAD
  const downloadPDF = (
    student,
    studentMarks,
    sgpa
  ) => {

    const pdfBlob =
      generateGradeCard(

        student,
        studentMarks,
        sgpa,
        sgpa
      )

    saveAs(
      pdfBlob,
      `${student.roll}_GradeCard.pdf`
    )
  }

  // DOWNLOAD ALL PDFS
  const downloadAllResults =
    async () => {

      const zip =
        new JSZip()

      for (const student of students) {

        const studentMarks =
          marks.filter(
            (m) =>
              m.roll === student.roll
          )

        const sgpa =
          calculateSGPA(
            student.roll
          )

        const pdfBlob =
          generateGradeCard(

            student,
            studentMarks,
            sgpa,
            sgpa
          )

        zip.file(
          `${student.roll}_GradeCard.pdf`,
          pdfBlob
        )
      }

      // GENERATE ZIP
      const content =
        await zip.generateAsync({

          type: 'blob'
        })

      saveAs(
        content,
        'All_GradeCards.zip'
      )
    }

  // SEND EMAIL
  const sendEmail =
    async (student) => {

      try {

        await axios.post(
          'http://localhost:5000/api/email',
          {

            email:
              student.email,

            studentName:
              student.name
          }
        )

        alert(
          'Email Sent Successfully'
        )

      } catch (error) {

        console.log(error)

        alert(
          'Email Failed'
        )
      }
    }

  return (

    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-4xl font-bold text-indigo-600 mb-6">
        Results
      </h1>

      {/* BULK DOWNLOAD */}
      <button
        onClick={downloadAllResults}
        className="mb-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
      >
        Download All Grade Cards
      </button>

      {/* TABLE */}
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

              <th className="p-4 text-left">
                SGPA
              </th>

              <th className="p-4 text-left">
                Download
              </th>

              <th className="p-4 text-left">
                Email
              </th>

            </tr>

          </thead>

          <tbody>

            {students.map((student) => {

              const studentMarks =
                marks.filter(
                  (m) =>
                    m.roll === student.roll
                )

              const sgpa =
                calculateSGPA(
                  student.roll
                )

              return (

                <tr
                  key={student._id}
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

                  <td className="p-4 font-bold text-indigo-600">
                    {sgpa}
                  </td>

                  {/* DOWNLOAD */}
                  <td className="p-4">

                    <button
                      onClick={() =>
                        downloadPDF(
                          student,
                          studentMarks,
                          sgpa
                        )
                      }
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
                    >
                      Download PDF
                    </button>

                  </td>

                  {/* EMAIL */}
                  <td className="p-4">

                    <button
                      onClick={() =>
                        sendEmail(student)
                      }
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                    >
                      Send Email
                    </button>

                  </td>

                </tr>
              )
            })}

          </tbody>

        </table>

      </div>

    </div>
  )
}

export default Results