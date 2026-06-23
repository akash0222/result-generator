import { useNavigate } from 'react-router-dom'

function General() {
  const navigate = useNavigate()

  const modules = [
    {
      icon: '🏫',
      title: 'School Profile',
      description: 'School information & branding',
      path: '/school-profile',
    },

    {
      icon: '🏛️',
      title: 'Classes & Sections',
      description: 'Manage classes and sections',
      path: '/classes',
    },

    {
      icon: '📅',
      title: 'Academic Session',
      //description: '2025-26, 2026-27',
      path: '/academic-session',
    },

    {
      icon: '📚',
      title: 'Subjects',
      description: 'Subject master setup',
      path: '/subjects',
    },

    {
      icon: '👥',
      title: 'Users',
      description: 'User accounts & access',
      path: '/users',
    },

    {
      icon: '🔐',
      title: 'Roles & Permissions',
      description: 'Access control',
      path: '/roles',
    },
  ]

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <div className="mb-10">
        <h1 className="text-4xl font-bold text-slate-800">
          ⚙️ Master Settings
        </h1>

        <p className="text-gray-500 mt-2">
          Configure core School ERP data
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {modules.map((module) => (
          <div
            key={module.title}
            onClick={() => navigate(module.path)}
            className="
              bg-white
              rounded-3xl
              shadow-md
              hover:shadow-xl
              hover:-translate-y-1
              transition-all
              cursor-pointer
              p-6
            "
          >
            <div className="text-5xl mb-4">
              {module.icon}
            </div>

            <h2 className="text-xl font-bold text-slate-800">
              {module.title}
            </h2>

            <p className="text-gray-500 mt-2">
              {module.description}
            </p>
          </div>
        ))}

      </div>
    </div>
  )
}

export default General