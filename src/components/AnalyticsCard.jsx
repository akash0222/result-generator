function AnalyticsCard({
  title,
  value,
  bg,
  text
}) {

  return (

    <div className={`${bg} rounded-2xl p-5`}>

      <p className="text-gray-600">
        {title}
      </p>

      <p className={`text-4xl font-bold ${text}`}>
        {value}
      </p>

    </div>

  )
}

export default AnalyticsCard