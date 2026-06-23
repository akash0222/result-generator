import {
  Routes,
  Route,
  Navigate
} from 'react-router-dom'

import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import RoleProtectedRoute from './components/RoleProtectedRoute'

// =========================
// AUTH
// =========================

import Login from './pages/Login'
import StudentLogin from './pages/StudentLogin'
import FacultyLogin from './pages/FacultyLogin'

// =========================
// CORE SCHOOL ERP MODULES
// =========================

import Dashboard from './pages/Dashboard'
import SchoolProfile from './pages/SchoolProfile'
import Classes from './pages/Classes'
import Students from './pages/Students'
import Attendance from './pages/Attendance'
import FacultyDashboard from './pages/FacultyDashboard'
import General from './pages/General'

function App() {
  return (
    <Routes>

      {/* HOME */}

      <Route
        path="/"
        element={
          <Navigate
            to="/login"
            replace
          />
        }
      />

      {/* AUTH */}

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/student-login"
        element={<StudentLogin />}
      />

      <Route
        path="/faculty-login"
        element={<FacultyLogin />}
      />

      {/* DASHBOARD */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* SCHOOL PROFILE */}

      <Route
        path="/school-profile"
        element={
          <ProtectedRoute>
            <Layout>
              <SchoolProfile />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* CLASSES */}

      <Route
        path="/classes"
        element={
          <ProtectedRoute>
            <Layout>
              <Classes />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* STUDENTS */}

      <Route
        path="/students"
        element={
          <ProtectedRoute>
            <Layout>
              <Students />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* TEACHERS */}

      <Route
        path="/faculty-dashboard"
        element={
          <RoleProtectedRoute role="faculty">
            <Layout>
              <FacultyDashboard />
            </Layout>
          </RoleProtectedRoute>
        }
      />

      {/* ATTENDANCE */}

      <Route
        path="/attendance"
        element={
          <ProtectedRoute>
            <Layout>
              <Attendance />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* SETTINGS */}

      <Route
        path="/general"
        element={
          <ProtectedRoute>
            <Layout>
              <General />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* 404 */}

      <Route
        path="*"
        element={
          <Navigate
            to="/dashboard"
            replace
          />
        }
      />

    </Routes>
  )
}

export default App