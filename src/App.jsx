import {
  Routes,
  Route,
  Navigate
} from 'react-router-dom'

import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import RoleProtectedRoute from './components/RoleProtectedRoute'

// =========================
// ADMIN PAGES
// =========================

import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Students from './pages/Students'
import Subjects from './pages/Subjects'
import Marks from './pages/Marks'
import Results from './pages/Results'
import RankList from './pages/RankList'
import CGPA from './pages/CGPA'
import Upload from './pages/Upload'
import PublishResults from './pages/PublishResults'
import Transcript from './pages/Transcript'
import Attendance from './pages/Attendance'
import Fees from './pages/Fees'
import Library from './pages/Library'
import Transport from './pages/Transport'
import General from './pages/General'
import SchoolProfile from './pages/SchoolProfile'
import Classes from './pages/Classes'

// =========================
// STUDENT PAGES
// =========================

import StudentLogin from './pages/StudentLogin'
import StudentDashboard from './pages/StudentDashboard'

// =========================
// FACULTY PAGES
// =========================

import FacultyLogin from './pages/FacultyLogin'
import FacultyDashboard from './pages/FacultyDashboard'

function App() {
  return (
    <Routes>

      {/* DEFAULT */}

      <Route
        path="/"
        element={<Navigate to="/login" replace />}
      />

      {/* AUTH */}

      <Route path="/login" element={<Login />} />
      <Route path="/student-login" element={<StudentLogin />} />
      <Route path="/faculty-login" element={<FacultyLogin />} />

      {/* STUDENT */}

      <Route
        path="/student-dashboard"
        element={
          <ProtectedRoute>
            <Layout>
              <StudentDashboard />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* FACULTY */}

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

      {/* ADMIN */}

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

      <Route
        path="/subjects"
        element={
          <ProtectedRoute>
            <Layout>
              <Subjects />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/marks"
        element={
          <ProtectedRoute>
            <Layout>
              <Marks />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/results"
        element={
          <ProtectedRoute>
            <Layout>
              <Results />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/ranklist"
        element={
          <ProtectedRoute>
            <Layout>
              <RankList />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/cgpa"
        element={
          <ProtectedRoute>
            <Layout>
              <CGPA />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/upload"
        element={
          <ProtectedRoute>
            <Layout>
              <Upload />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/transcript"
        element={
          <ProtectedRoute>
            <Layout>
              <Transcript />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/classes"
        element={
          <ProtectedRoute>
          <Layout>
          <Classes/>
          </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/publish-results"
        element={
          <ProtectedRoute>
            <Layout>
              <PublishResults />
            </Layout>
          </ProtectedRoute>
        }
      />

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

      <Route
        path="/fees"
        element={
          <ProtectedRoute>
            <Layout>
              <Fees />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/library"
        element={
          <ProtectedRoute>
            <Layout>
              <Library />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/transport"
        element={
          <ProtectedRoute>
            <Layout>
              <Transport />
            </Layout>
          </ProtectedRoute>
        }
      />

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

      {/* 404 */}

      <Route
        path="*"
        element={<Navigate to="/dashboard" replace />}
      />

    </Routes>
  )
}

export default App