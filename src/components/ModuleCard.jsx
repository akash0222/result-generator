import { useNavigate } from 'react-router-dom'

function ModuleCard({
  title,
  icon,
  color,
  count,
  buttons
}) {

  const navigate = useNavigate()

  return (
    <div className="bg-white rounded-3xl shadow-lg overflow-hidden">

      <div className={`${color} text-white p-5`}>

        <h2 className="text-2xl font-bold">
          {icon} {title}
        </h2>

      </div>

      <div className="p-5">

        <p className="text-5xl font-bold mb-5">
          {count}
        </p>

        <div className="grid grid-cols-2 gap-3">

          {buttons.map(btn => (

            <button
              key={btn.path}
              onClick={() =>
                navigate(btn.path)
              }
              className="bg-gray-100 hover:bg-gray-200 p-3 rounded-xl"
            >
              {btn.label}
            </button>

          ))}

        </div>

      </div>

    </div>
  )
}

export default ModuleCard