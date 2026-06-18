import { useNavigate } from 'react-router-dom'

function General() {

  const navigate = useNavigate()

  const modules = [

    {
      icon: '🏫',
      title: 'School Profile',
      path: '/school-profile'
    },

    {
      icon: '📅',
      title: 'Academic Year',
      path: '/academic-year'
    },

    {
      icon: '🏛️',
      title: 'Classes',
      path: '/classes'
    },

    {
      icon: '📚',
      title: 'Sections',
      path: '/sections'
    },

    {
      icon: '👤',
      title: 'User Management',
      path: '/users'
    },

    {
      icon: '🔐',
      title: 'Roles & Permissions',
      path: '/roles'
    },

    {
      icon: '📧',
      title: 'Email Settings',
      path: '/email-settings'
    },

    {
      icon: '📱',
      title: 'SMS Settings',
      path: '/sms-settings'
    },

    {
      icon: '☁️',
      title: 'Backup & Restore',
      path: '/backup'
    },

    {
      icon: '⚙️',
      title: 'System Settings',
      path: '/settings'
    }

  ]

  return (

    <div className="min-h-screen bg-slate-100 p-8">

      <div className="mb-10">

        <h1 className="text-4xl font-bold text-slate-800">
          ⚙️ General Administration
        </h1>

        <p className="text-gray-500 mt-2">
          Configure School ERP Master Data & Settings
        </p>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {modules.map((module) => (

          <div
            key={module.title}
            onClick={() => navigate(module.path)}
            className="
              bg-white
              rounded-3xl
              shadow-lg
              hover:shadow-2xl
              hover:-translate-y-2
              transition-all
              duration-300
              cursor-pointer
              p-8
              text-center
            "
          >

            <div className="text-6xl mb-4">
              {module.icon}
            </div>

            <h2 className="font-bold text-lg text-slate-800">
              {module.title}
            </h2>

          </div>

        ))}

      </div>

    </div>

  )
}

export default General