import { NavLink } from 'react-router-dom'

function Sidebar() {

  const menus = [
    { name: 'Dashboard', path: '/dashboard', icon: '🏠' },
    { name: 'Students', path: '/students', icon: '👨‍🎓' },
    { name: 'Subjects', path: '/subjects', icon: '📚' },
    { name: 'Marks', path: '/marks', icon: '📝' },
    { name: 'Results', path: '/results', icon: '📊' },
    { name: 'CGPA', path: '/cgpa', icon: '🎯' },
    { name: 'Rank List', path: '/ranklist', icon: '🏆' },
    { name: 'Upload', path: '/upload', icon: '📤' },
    { name: 'Attendance', path: '/attendance', icon: '📅' },
    { name: 'Fees', path: '/fees', icon: '💰' },
    { name: 'Library', path: '/library', icon: '📚' },
    { name: 'Transport', path: '/transport', icon: '🚌' },
    { name: 'School Profile', path: '/school-profile', icon: '🏫' },
    { name: 'Settings', path: '/general', icon: '⚙️' },
    { name:'Classes',path:'/classes',icon:'🏫'}
  ]

  return (
    <div className="w-72 bg-slate-900 text-white min-h-screen shadow-2xl">

      <div className="p-6 border-b border-slate-700">

        <h1 className="text-3xl font-bold">
          School ERP
        </h1>

        <p className="text-slate-400 text-sm mt-1">
          Result Management System
        </p>

      </div>

      <div className="p-4">

        {menus.map((menu) => (

          <NavLink
            key={menu.path}
            to={menu.path}
            className={({ isActive }) =>
              `
              flex
              items-center
              gap-4
              px-4
              py-3
              rounded-xl
              mb-2
              transition-all
              ${
                isActive
                  ? 'bg-blue-600 shadow-lg'
                  : 'hover:bg-slate-800'
              }
              `
            }
          >
            <span className="text-xl">
              {menu.icon}
            </span>

            <span>
              {menu.name}
            </span>

          </NavLink>

        ))}

      </div>

    </div>
  )
}

export default Sidebar