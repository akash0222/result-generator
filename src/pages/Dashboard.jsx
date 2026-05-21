import { useEffect, useState } from 'react'
import axios from 'axios'
import API_URL from '../config'

function Dashboard() {

  // =========================
  // STATES
  // =========================

  const [students, setStudents] =
    useState([])

  const [subjects, setSubjects] =
    useState([])

  const [marks, setMarks] =
    useState([])

  const [loading, setLoading] =
    useState(true)

  const [selectedSemester,
    setSelectedSemester] =
      useState('All')

  // =========================
  // TOKEN
  // =========================

  const token =
    localStorage.getItem('token')

  // =========================
  // LOAD DATA
  // =========================

  useEffect(() => {

    fetchAllData()

  }, [])

  // =========================
  // FETCH ALL DATA
  // =========================

  const fetchAllData =
    async () => {

      try {

        setLoading(true)

        await Promise.all([

          fetchStudents(),

          fetchSubjects(),

          fetchMarks()

        ])

      } catch (error) {

        console.log(error)

      } finally {

        setLoading(false)
      }
    }

  // =========================
  // FETCH STUDENTS
  // =========================

  const fetchStudents =
    async () => {

      try {

        const res =
          await axios.get(

            `${API_URL}/api/students`,

            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          )

        setStudents(res.data)

      } catch (error) {

        console.log(
          'Students Error:',
          error.response?.data ||
          error.message
        )
      }
    }

  // =========================
  // FETCH SUBJECTS
  // =========================

  const fetchSubjects =
    async () => {

      try {

        const res =
          await axios.get(

            `${API_URL}/api/subjects`,

            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          )

        setSubjects(res.data)

      } catch (error) {

        console.log(
          'Subjects Error:',
          error.response?.data ||
          error.message
        )
      }
    }

  // =========================
  // FETCH MARKS
  // =========================

  const fetchMarks =
    async () => {

      try {

        const res =
          await axios.get(

            `${API_URL}/api/marks`,

            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          )

        setMarks(res.data)

      } catch (error) {

        console.log(
          'Marks Error:',
          error.response?.data ||
          error.message
        )
      }
    }

  // =========================
  // FILTER MARKS
  // =========================

  const filteredMarks =
    selectedSemester === 'All'

      ? marks

      : marks.filter(
          (m) =>
            String(m.semester) ===
            selectedSemester
        )

  // =========================
  // GPA CALCULATION
  // =========================

  const calculateAverageSGPA =
    () => {

      if (
        filteredMarks.length === 0
      ) {
        return 0
      }

      let total = 0

      filteredMarks.forEach(
        (mark) => {

          switch (mark.grade) {

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
        filteredMarks.length
      ).toFixed(2)
    }

  // =========================
  // FAILED STUDENTS
  // =========================

  const failedStudents =
    filteredMarks.filter(
      (m) => m.grade === 'F'
    ).length

  // =========================
  // PASS PERCENTAGE
  // =========================

  const passPercentage =
    filteredMarks.length > 0

      ? (
          (
            (
              filteredMarks.length -
              failedStudents
            ) /
            filteredMarks.length
          ) * 100
        ).toFixed(2)

      : 0

  // =========================
  // TOPPER
  // =========================

  const topper =
    students.length > 0

      ? students[0]

      : null

  // =========================
  // LOADING UI
  // =========================

  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-gray-100">

        <div className="text-3xl font-bold text-blue-600">
          Loading Dashboard...
        </div>

      </div>
    )
  }

  return (

    <div className="min-h-screen bg-gray-100 p-6">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">

        <h1 className="text-5xl font-bold text-blue-600">
          Dashboard
        </h1>

        {/* SEMESTER FILTER */}
        <select

          value={selectedSemester}

          onChange={(e) =>
            setSelectedSemester(
              e.target.value
            )
          }

          className="mt-4 md:mt-0 border p-3 rounded-xl"
        >

          <option value="All">
            All Semesters
          </option>

          <option value="1">
            Semester 1
          </option>

          <option value="2">
            Semester 2
          </option>

          <option value="3">
            Semester 3
          </option>

          <option value="4">
            Semester 4
          </option>

        </select>

      </div>

      {/* TOP CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        {/* STUDENTS */}
        <div className="bg-white p-6 rounded-2xl shadow">

          <h2 className="text-gray-500 text-lg">
            Total Students
          </h2>

          <p className="text-5xl font-bold text-blue-600 mt-3">
            {students.length}
          </p>

        </div>

        {/* SUBJECTS */}
        <div className="bg-white p-6 rounded-2xl shadow">

          <h2 className="text-gray-500 text-lg">
            Total Subjects
          </h2>

          <p className="text-5xl font-bold text-green-600 mt-3">
            {subjects.length}
          </p>

        </div>

        {/* MARKS */}
        <div className="bg-white p-6 rounded-2xl shadow">

          <h2 className="text-gray-500 text-lg">
            Marks Entries
          </h2>

          <p className="text-5xl font-bold text-purple-600 mt-3">
            {filteredMarks.length}
          </p>

        </div>

        {/* GPA */}
        <div className="bg-white p-6 rounded-2xl shadow">

          <h2 className="text-gray-500 text-lg">
            Average GPA
          </h2>

          <p className="text-5xl font-bold text-indigo-600 mt-3">
            {calculateAverageSGPA()}
          </p>

        </div>

      </div>

      {/* SECOND ROW */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

        {/* FAILED */}
        <div className="bg-white p-6 rounded-2xl shadow">

          <h2 className="text-gray-500 text-lg">
            Failed Students
          </h2>

          <p className="text-5xl font-bold text-red-600 mt-3">
            {failedStudents}
          </p>

        </div>

        {/* PASS */}
        <div className="bg-white p-6 rounded-2xl shadow">

          <h2 className="text-gray-500 text-lg">
            Pass Percentage
          </h2>

          <p className="text-5xl font-bold text-green-600 mt-3">
            {passPercentage}%
          </p>

        </div>

        {/* TOPPER */}
        <div className="bg-white p-6 rounded-2xl shadow">

          <h2 className="text-gray-500 text-lg">
            Topper
          </h2>

          <p className="text-2xl font-bold text-yellow-600 mt-3">

            {topper
              ? topper.name
              : 'N/A'}

          </p>

        </div>

      </div>

      {/* RECENT ACTIVITY */}
      <div className="bg-white p-6 rounded-2xl shadow mt-8">

        <h2 className="text-2xl font-bold text-gray-700 mb-4">
          Recent Activity
        </h2>

        <div className="space-y-3">

          <div className="border p-4 rounded-xl">
            Students Added:
            <span className="font-bold text-blue-600 ml-2">
              {students.length}
            </span>
          </div>

          <div className="border p-4 rounded-xl">
            Subjects Created:
            <span className="font-bold text-green-600 ml-2">
              {subjects.length}
            </span>
          </div>

          <div className="border p-4 rounded-xl">
            Marks Uploaded:
            <span className="font-bold text-purple-600 ml-2">
              {marks.length}
            </span>
          </div>

        </div>

      </div>

    </div>
  )
}

export default Dashboard