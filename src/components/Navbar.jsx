import { Link, useNavigate } from 'react-router-dom'


function Navbar() {

  const navigate = useNavigate()

  // LOGOUT
  const logout = () => {

    localStorage.removeItem('isLoggedIn')

    navigate('/login')
  }

  return (

    <nav className="bg-white shadow mb-6">

      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap gap-6 items-center">

        {/* DASHBOARD */}
        <Link
          to="/dashboard"
          className="text-gray-700 font-semibold"
        >
          Dashboard
        </Link>

        {/* STUDENTS */}
        <Link
          to="/students"
          className="text-blue-600 font-semibold"
        >
          Students
        </Link>

        {/* SUBJECTS */}
        <Link
          to="/subjects"
          className="text-green-600 font-semibold"
        >
          Subjects
        </Link>

        {/* MARKS */}
        <Link
          to="/marks"
          className="text-purple-600 font-semibold"
        >
          Marks
        </Link>

        {/* RESULTS */}
        <Link
          to="/results"
          className="text-indigo-600 font-semibold"
        >
          Results
        </Link>

        {/* UPLOAD */}
        <Link
          to="/upload"
          className="text-orange-600 font-semibold"
        >
          Upload
        </Link>

        {/* RANK LIST */}
        <Link
          to="/ranklist"
          className="text-yellow-600 font-semibold"
        >
          Rank List
        </Link>

        {/* CGPA */}
        <Link
          to="/cgpa"
          className="text-pink-600 font-semibold"
        >
          CGPA
        </Link>

        <Link
          to="/publish-results"
          className="text-red-600 font-semibold"
        >
          Publish Results
        </Link>

        {/* LOGOUT BUTTON */}
        <button
          onClick={logout}
          className="ml-auto bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>

      </div>

    </nav>
  )
}

export default Navbar