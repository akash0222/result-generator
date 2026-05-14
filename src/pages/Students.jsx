import { useState, useEffect } from 'react'
import StudentForm from '../components/StudentForm'

function Students() {

  // STUDENT STATE
  const [students, setStudents] = useState([])

  // LOAD DATA FROM LOCAL STORAGE
  useEffect(() => {
    const saved = localStorage.getItem('students')

    if (saved) {
      setStudents(JSON.parse(saved))
    }
  }, [])

  // SAVE DATA TO LOCAL STORAGE
  useEffect(() => {
    localStorage.setItem(
      'students',
      JSON.stringify(students)
    )
  }, [students])

  // ADD NEW STUDENT
  const addStudent = (student) => {
    setStudents([...students, student])
  }

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-4">
        Students
      </h1>

      {/* STUDENT FORM */}
      <StudentForm addStudent={addStudent} />

      {/* STUDENT TABLE */}
      <div className="mt-6 bg-white rounded shadow p-4">

        <table className="w-full border">

          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Name</th>
              <th className="border p-2">Roll</th>
              <th className="border p-2">Course</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student, index) => (
              <tr key={index}>

                <td className="border p-2">
                  {student.name}
                </td>

                <td className="border p-2">
                  {student.roll}
                </td>

                <td className="border p-2">
                  {student.course}
                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  )
}

export default Students