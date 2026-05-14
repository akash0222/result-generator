import { Link } from 'react-router-dom'

function Navbar() {

  return (

    <nav className="bg-white shadow mb-6">

      <div className="max-w-7xl mx-auto px-6 py-4 flex gap-6">

        <Link
  to="/dashboard"
  className="text-gray-700 font-semibold"
>
  Dashboard
</Link>

        <Link
          to="/students"
          className="text-blue-600 font-semibold"
        >
          Students
        </Link>

        <Link
          to="/subjects"
          className="text-green-600 font-semibold"
        >
          Subjects
        </Link>

        <Link
          to="/marks"
          className="text-purple-600 font-semibold"
        >
          Marks
        </Link>

        <Link
          to="/results"
          className="text-indigo-600 font-semibold"
        >
          Results
        </Link>

        <Link
  to="/upload"
  className="text-orange-600 font-semibold"
>
  Upload
</Link>

      </div>

    </nav>
  )
}

export default Navbar