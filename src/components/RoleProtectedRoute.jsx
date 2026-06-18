import {
  Navigate
} from 'react-router-dom'

function RoleProtectedRoute({

  children,
  role

}) {

  const faculty =
    JSON.parse(

      localStorage.getItem(
        'faculty'
      )
    )

  // NO LOGIN
  if (!faculty) {

    return (
      <Navigate
        to="/faculty-login"
      />
    )
  }

  // WRONG ROLE
  if (
    faculty.role !== role
  ) {

    return (
      <Navigate
        to="/"
      />
    )
  }

  return children
}

export default
RoleProtectedRoute