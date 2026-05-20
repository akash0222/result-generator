import {
  useEffect,
  useState
} from 'react'

import axios from 'axios'

import API_URL from '../config'

import generateGradeCard
from '../utils/generateGradeCard'

import JSZip from 'jszip'

import { saveAs }
from 'file-saver'

function Results() {

  const [students, setStudents] =
    useState([])

  const [marks, setMarks] =
    useState([])

  // =========================
  // TOKEN
  // =========================

  const token =
    localStorage.getItem('token')

  // =========================
  // LOAD DATA
  // =========================

  useEffect(() => {

    fetchData()

  }, [])

  // =========================
  // FETCH DATA
  // =========================

  const fetchData =
    async () => {

      try {

        // STUDENTS
        const studentsRes =
          await axios.get(

            `${API_URL}/api/students`,

            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          )

        // MARKS
        const marksRes =
          await axios.get(

            `${API_URL}/api/marks`,

            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          )

        setStudents(
          studentsRes.data
        )

        setMarks(
          marksRes.data
        )

      } catch (error) {

        console.log(error)

        alert(
          error.response?.data?.message ||
          'Failed to load results'
        )
      }
    }

  // =========================
  // CALCULATE SGPA
  // =========================

  const calculateSGPA =
    (roll) => {

      const studentMarks =
        marks.filter(
          (m) =>
            m.roll === roll
        )

      if (
        studentMarks.length === 0
      ) {

        return 0
      }

      let total = 0

      studentMarks.forEach(
        (m) => {

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
        }
      )

      return (
        total /
        studentMarks.length
      ).toFixed(2)
    }

  // =========================
  // DOWNLOAD SINGLE PDF
  // =========================

  const downloadPDF =
    (
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

  // =========================
  // DOWNLOAD ALL PDFs
  // =========================

  const downloadAllResults =
    async () => {

      try {

        const zip =
          new JSZip()

        for (
          const student of students
        ) {

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

        const content =
          await zip.generateAsync({

            type: 'blob'
          })

        saveAs(

          content,

          'All_GradeCards.zip'
        )

      } catch (error) {

        console.log(error)

        alert(
          'ZIP Download Failed'
        )
      }
    }

  // =========================
  // SEND EMAIL
  // =========================

  const sendEmail =
    async (student) => {

      try {

        await axios.post(

          `${API_URL}/api/email`,

          {

            email:
              student.email,

            studentName:
              student.name
          },

          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        )

        alert(
          'Email Sent Successfully'
        )

      } catch (error) {

        console.log(error)

        alert(
          error.response?.data?.message ||
          'Email Failed'
        )
      }
    }

  return (

    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-4xl font-bold text-indigo-600 mb-6">
        Results
      </h1>

      {/* DOWNLOAD ALL */}
      <button

        onClick={
          downloadAllResults
        }

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

            {students.map(
              (student) => {

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
              }
            )}

          </tbody>

        </table>

      </div>

    </div>
  )
}

export default Results