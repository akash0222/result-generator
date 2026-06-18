function FacultyDashboard() {

  const faculty =
    JSON.parse(
      localStorage.getItem(
        'faculty'
      )
    )

  return (

    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-4xl font-bold text-blue-600 mb-6">
        Faculty Dashboard
      </h1>

      <div className="bg-white p-6 rounded-xl shadow">

        <h2 className="text-2xl font-bold">
          Welcome,
          {faculty?.name}
        </h2>

        <p className="mt-3">
          Subject:
          {faculty?.subject}
        </p>

        <p className="mt-2">
          Role:
          {faculty?.role}
        </p>

      </div>

    </div>
  )
}

export default FacultyDashboard