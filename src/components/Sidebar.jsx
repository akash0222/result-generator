import { NavLink } from 'react-router-dom'

function Sidebar() {
  const menus = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: '🏠',
    },

    {
      name: 'Students',
      path: '/students',
      icon: '👨‍🎓',
    },

    {
      name: 'Teachers',
      path: '/faculty-dashboard',
      icon: '👩‍🏫',
    },

    {
      name: 'Attendance',
      path: '/attendance',
      icon: '📅',
    },

    {
      name: 'Settings',
      path: '/general',
      icon: '⚙️',
    },
  ]

  return (
    <div className="w-72 bg-slate-900 text-white min-h-screen shadow-2xl">

      <div className="p-6 border-b border-slate-700">

        <h1 className="text-3xl font-bold">
          School ERP
        </h1>

        <p className="text-slate-400 text-sm mt-1">
          School Management System
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

            <span className="font-medium">
              {menu.name}
            </span>
          </NavLink>
        ))}

      </div>
    </div>
  )
}

export default Sidebar