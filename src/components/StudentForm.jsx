import { useState } from 'react'

function StudentForm({ addStudent }) {
  const [student, setStudent] = useState({
    name: '',
    roll: '',
    course: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    addStudent(student)

    setStudent({
      name: '',
      roll: '',
      course: ''
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded shadow space-y-4"
    >
      <input
        type="text"
        placeholder="Student Name"
        value={student.name}
        onChange={(e) =>
          setStudent({ ...student, name: e.target.value })
        }
        className="border p-2 w-full"
      />

      <input
        type="text"
        placeholder="Roll Number"
        value={student.roll}
        onChange={(e) =>
          setStudent({ ...student, roll: e.target.value })
        }
        className="border p-2 w-full"
      />

      <input
        type="text"
        placeholder="Course"
        value={student.course}
        onChange={(e) =>
          setStudent({ ...student, course: e.target.value })
        }
        className="border p-2 w-full"
      />

      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Add Student
      </button>
    </form>
  )
}

export default StudentForm
