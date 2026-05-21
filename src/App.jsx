import {
  Routes,
  Route,
  Navigate
} from 'react-router-dom'

import Navbar
from './components/Navbar'

import ProtectedRoute
from './components/ProtectedRoute'

import RoleProtectedRoute
from './components/RoleProtectedRoute'

// =========================
// ADMIN PAGES
// =========================

import Login
from './pages/Login'

import Dashboard
from './pages/Dashboard'

import Students
from './pages/Students'

import Subjects
from './pages/Subjects'

import Marks
from './pages/Marks'

import Results
from './pages/Results'

import RankList
from './pages/RankList'

import CGPA
from './pages/CGPA'

import Upload
from './pages/Upload'

import PublishResults
from './pages/PublishResults'

import Transcript
from './pages/Transcript'

// =========================
// STUDENT PAGES
// =========================

import StudentLogin
from './pages/StudentLogin'

import StudentDashboard
from './pages/StudentDashboard'

// =========================
// FACULTY PAGES
// =========================

import FacultyLogin
from './pages/FacultyLogin'

import FacultyDashboard
from './pages/FacultyDashboard'

function App() {

  return (

    <div>

      <Routes>

        {/* ========================= */}
        {/* DEFAULT */}
        {/* ========================= */}

        <Route
          path="/"
          element={
            <Navigate to="/login" />
          }
        />

        {/* ========================= */}
        {/* ADMIN LOGIN */}
        {/* ========================= */}

        <Route
          path="/login"
          element={<Login />}
        />

        {/* ========================= */}
        {/* STUDENT LOGIN */}
        {/* ========================= */}

        <Route
          path="/student-login"
          element={<StudentLogin />}
        />

        {/* ========================= */}
        {/* STUDENT DASHBOARD */}
        {/* ========================= */}

        <Route
          path="/student-dashboard"
          element={
            <ProtectedRoute>

              <>
                <Navbar />
                <StudentDashboard />
              </>

            </ProtectedRoute>
          }
        />

        {/* ========================= */}
        {/* FACULTY LOGIN */}
        {/* ========================= */}

        <Route
          path="/faculty-login"
          element={<FacultyLogin />}
        />

        {/* ========================= */}
        {/* FACULTY DASHBOARD */}
        {/* ========================= */}

        <Route

          path="/faculty-dashboard"

          element={

            <RoleProtectedRoute
              role="faculty"
            >

              <>
                <Navbar />
                <FacultyDashboard />
              </>

            </RoleProtectedRoute>
          }
        />

        {/* ========================= */}
        {/* DASHBOARD */}
        {/* ========================= */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>

              <>
                <Navbar />
                <Dashboard />
              </>

            </ProtectedRoute>
          }
        />

        {/* ========================= */}
        {/* STUDENTS */}
        {/* ========================= */}

        <Route
          path="/students"
          element={
            <ProtectedRoute>

              <>
                <Navbar />
                <Students />
              </>

            </ProtectedRoute>
          }
        />

        {/* ========================= */}
        {/* SUBJECTS */}
        {/* ========================= */}

        <Route
          path="/subjects"
          element={
            <ProtectedRoute>

              <>
                <Navbar />
                <Subjects />
              </>

            </ProtectedRoute>
          }
        />

        {/* ========================= */}
        {/* MARKS */}
        {/* ========================= */}

        <Route
          path="/marks"
          element={
            <ProtectedRoute>

              <>
                <Navbar />
                <Marks />
              </>

            </ProtectedRoute>
          }
        />

        {/* ========================= */}
        {/* RESULTS */}
        {/* ========================= */}

        <Route
          path="/results"
          element={
            <ProtectedRoute>

              <>
                <Navbar />
                <Results />
              </>

            </ProtectedRoute>
          }
        />

        {/* ========================= */}
        {/* RANK LIST */}
        {/* ========================= */}

        <Route
          path="/ranklist"
          element={
            <ProtectedRoute>

              <>
                <Navbar />
                <RankList />
              </>

            </ProtectedRoute>
          }
        />

        {/* ========================= */}
        {/* CGPA */}
        {/* ========================= */}

        <Route
          path="/cgpa"
          element={
            <ProtectedRoute>

              <>
                <Navbar />
                <CGPA />
              </>

            </ProtectedRoute>
          }
        />

        {/* ========================= */}
        {/* TRANSCRIPT */}
        {/* ========================= */}

        <Route
          path="/transcript"
          element={
            <ProtectedRoute>

              <>
                <Navbar />
                <Transcript />
              </>

            </ProtectedRoute>
          }
        />

        {/* ========================= */}
        {/* UPLOAD */}
        {/* ========================= */}

        <Route
          path="/upload"
          element={
            <ProtectedRoute>

              <>
                <Navbar />
                <Upload />
              </>

            </ProtectedRoute>
          }
        />

        {/* ========================= */}
        {/* PUBLISH RESULTS */}
        {/* ========================= */}

        <Route
          path="/publish-results"
          element={
            <ProtectedRoute>

              <>
                <Navbar />
                <PublishResults />
              </>

            </ProtectedRoute>
          }
        />

      </Routes>

    </div>
  )
}

export default App