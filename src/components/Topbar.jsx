function Topbar() {

  const logout = () => {
    localStorage.removeItem('token')
    window.location.href = '/login'
  }

  return (

    <div className="
      bg-white
      shadow-sm
      px-8
      py-4
      flex
      justify-between
      items-center
      border-b
    ">

      <div>

        <h2 className="text-2xl font-bold text-slate-800">
          Dashboard
        </h2>

        <p className="text-gray-500">
          Welcome back Admin
        </p>

      </div>

      <div className="flex items-center gap-4">

        <button
          className="
          bg-slate-100
          w-10
          h-10
          rounded-full
          "
        >
          🔔
        </button>

        <div className="text-right">

          <p className="font-semibold">
            Administrator
          </p>

          <p className="text-sm text-gray-500">
            Admin Panel
          </p>

        </div>

        <button
          onClick={logout}
          className="
          bg-red-500
          hover:bg-red-600
          text-white
          px-4
          py-2
          rounded-lg
          "
        >
          Logout
        </button>

      </div>

    </div>
  )
}

export default Topbar