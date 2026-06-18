function DashboardHeader({
  selectedSemester,
  setSelectedSemester
}) {

  return (

    <div className="flex flex-col md:flex-row justify-between items-center mb-8">

      <div>

        <h1 className="text-4xl font-bold text-slate-800">
          PGDM ERP Dashboard
        </h1>

        <p className="text-gray-500">
          Academic Management System
        </p>

      </div>

      <select
        value={selectedSemester}
        onChange={(e) =>
          setSelectedSemester(
            e.target.value
          )
        }
        className="mt-4 md:mt-0 border rounded-xl px-4 py-2"
      >
        <option value="All">
          All Semesters
        </option>

        <option value="1">
          Semester 1
        </option>

        <option value="2">
          Semester 2
        </option>

        <option value="3">
          Semester 3
        </option>

        <option value="4">
          Semester 4
        </option>

      </select>

    </div>

  )
}

export default DashboardHeader