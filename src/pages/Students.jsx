import { useState, useEffect } from 'react'
import axios from 'axios'
import API_URL from '../config'

function Students() {

  const [students, setStudents] =
    useState([])

  const [search, setSearch] =
    useState('')

  const [formData, setFormData] =
    useState({

      name: '',

      roll: '',

      email: '',

      phone: '',

      course: '',

      semester: ''
    })

  const [editId, setEditId] =
    useState(null)

  // TOKEN
  const token =
    localStorage.getItem(
      'token'
    )

  // =========================
  // FETCH STUDENTS
  // =========================

  useEffect(() => {

    fetchStudents()

  }, [])

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

        console.log(error)
      }
    }

  // =========================
  // HANDLE INPUT
  // =========================

  const handleChange =
    (e) => {

      setFormData({

        ...formData,

        [e.target.name]:
          e.target.value
      })
    }

  // =========================
  // ADD / UPDATE
  // =========================

  const handleSubmit =
    async (e) => {

      e.preventDefault()

      try {

        // UPDATE
        if (editId) {

          const res =
            await axios.put(

              `${API_URL}/api/students/${editId}`,

              formData,

              {
                headers: {
                  Authorization:
                    `Bearer ${token}`
                }
              }
            )

          setStudents(

            students.map(
              (student) =>

                student._id === editId
                  ? res.data
                  : student
            )
          )

          alert(
            'Student Updated'
          )
        }

        // ADD
        else {

          const res =
            await axios.post(

              `${API_URL}/api/students`,

              formData,

              {
                headers: {
                  Authorization:
                    `Bearer ${token}`
                }
              }
            )

          setStudents([
            ...students,
            res.data
          ])

          alert(
            'Student Added'
          )
        }

        // RESET FORM
        setFormData({

          name: '',

          roll: '',

          email: '',

          phone: '',

          course: '',

          semester: ''
        })

        setEditId(null)

      } catch (error) {

        console.log(error)

        alert(

          error.response?.data?.message ||

          'Something went wrong'
        )
      }
    }

  // =========================
  // DELETE
  // =========================

  const deleteStudent =
    async (id) => {

      if (
        !window.confirm(
          'Delete Student?'
        )
      ) {
        return
      }

      try {

        await axios.delete(

          `${API_URL}/api/students/${id}`,

          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        )

        setStudents(

          students.filter(
            (student) =>
              student._id !== id
          )
        )

      } catch (error) {

        console.log(error)
      }
    }

  // =========================
  // EDIT
  // =========================

  const editStudent =
    (student) => {

      setFormData({

        name:
          student.name || '',

        roll:
          student.roll || '',

        email:
          student.email || '',

        phone:
          student.phone || '',

        course:
          student.course || '',

        semester:
          student.semester || ''
      })

      setEditId(student._id)

      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }

  // =========================
  // SEARCH
  // =========================

  const filteredStudents =
    students.filter(
      (student) =>

        student.name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )

        ||

        student.roll
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
    )

  return (

    <div className="min-h-screen bg-gray-100 p-6">

      {/* TITLE */}
      <h1 className="text-5xl font-bold text-blue-600 mb-8">
        Students Management
      </h1>

      {/* FORM */}
      <form

        onSubmit={handleSubmit}

        className="bg-white p-6 rounded-2xl shadow mb-6"
      >

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* NAME */}
          <input
            type="text"
            name="name"
            placeholder="Student Name"
            value={formData.name}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

          {/* ROLL */}
          <input
            type="text"
            name="roll"
            placeholder="Roll Number"
            value={formData.roll}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

          {/* EMAIL */}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          {/* PHONE */}
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          {/* COURSE */}
          <input
            type="text"
            name="course"
            placeholder="Course"
            value={formData.course}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

          {/* SEMESTER */}
          <select
            name="semester"
            value={formData.semester}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          >

            <option value="">
              Select Semester
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

        {/* BUTTON */}
        <button

          type="submit"

          className={`mt-6 text-white px-6 py-3 rounded-lg ${
            editId
              ? 'bg-yellow-500 hover:bg-yellow-600'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >

          {editId
            ? 'Update Student'
            : 'Add Student'}

        </button>

      </form>

      {/* SEARCH */}
      <input

        type="text"

        placeholder="Search Student"

        value={search}

        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }

        className="w-full border p-3 rounded-lg mb-6"
      />

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow overflow-auto">

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
                Email
              </th>

              <th className="p-4 text-left">
                Phone
              </th>

              <th className="p-4 text-left">
                Course
              </th>

              <th className="p-4 text-left">
                Semester
              </th>

              <th className="p-4 text-left">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredStudents.length === 0 ? (

              <tr>

                <td

                  colSpan="7"

                  className="p-6 text-center text-gray-500"
                >
                  No students found
                </td>

              </tr>

            ) : (

              filteredStudents.map(
                (student) => (

                  <tr

                    key={student._id}

                    className="border-t hover:bg-gray-50"
                  >

                    <td className="p-4">
                      {student.name}
                    </td>

                    <td className="p-4">
                      {student.roll}
                    </td>

                    <td className="p-4">
                      {student.email}
                    </td>

                    <td className="p-4">
                      {student.phone}
                    </td>

                    <td className="p-4">
                      {student.course}
                    </td>

                    <td className="p-4">
                      Semester {student.semester}
                    </td>

                    <td className="p-4 flex gap-2">

                      <button

                        onClick={() =>
                          editStudent(student)
                        }

                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
                      >
                        Edit
                      </button>

                      <button

                        onClick={() =>
                          deleteStudent(
                            student._id
                          )
                        }

                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                      >
                        Delete
                      </button>

                    </td>

                  </tr>
                )
              )
            )}

          </tbody>

        </table>

      </div>

    </div>
  )
}

export default Students