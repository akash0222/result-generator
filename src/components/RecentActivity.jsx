function RecentActivity({
  students,
  subjects,
  marks
}) {

  return (

    <div className="bg-white rounded-3xl shadow-lg p-6">

      <h2 className="text-2xl font-bold mb-4">
        Recent Activity
      </h2>

      <div className="space-y-3">

        <div className="border p-4 rounded-xl">
          👨‍🎓 Students Registered:
          <span className="ml-2 font-bold text-blue-600">
            {students}
          </span>
        </div>

        <div className="border p-4 rounded-xl">
          📚 Subjects Created:
          <span className="ml-2 font-bold text-purple-600">
            {subjects}
          </span>
        </div>

        <div className="border p-4 rounded-xl">
          📝 Marks Uploaded:
          <span className="ml-2 font-bold text-orange-600">
            {marks}
          </span>
        </div>

      </div>

    </div>

  )
}

export default RecentActivity