function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">
        Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h2>Total Students</h2>
          <p className="text-2xl font-bold">120</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2>Subjects</h2>
          <p className="text-2xl font-bold">8</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2>Results Generated</h2>
          <p className="text-2xl font-bold">120</p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard