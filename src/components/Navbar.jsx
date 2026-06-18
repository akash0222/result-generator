import { Link, useNavigate } from 'react-router-dom'

function Navbar() {

  const navigate = useNavigate()

  const logout = () => {

    localStorage.removeItem('token')
    localStorage.removeItem('isLoggedIn')

    navigate('/login')
  }

  return (

    <nav className="bg-slate-900 text-white shadow-lg">

      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap items-center gap-6">

        <Link
          to="/dashboard"
          className="font-bold text-xl text-blue-400"
        >
          ERP Dashboard
        </Link>

        <Link
          to="/students"
          className="hover:text-blue-400"
        >
          Student Management
        </Link>

        <Link
          to="/faculty-dashboard"
          className="hover:text-green-400"
        >
          Faculty Management
        </Link>

        <Link
          to="/subjects"
          className="hover:text-purple-400"
        >
          Academic Management
        </Link>

        <Link
          to="/results"
          className="hover:text-orange-400"
        >
          Examination & Results
        </Link>

        <button
          onClick={logout}
          className="ml-auto bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>

      </div>

    </nav>
  )
}

export default Navbar