import {
  Routes,
  Route,
  Navigate
} from 'react-router-dom'

import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'

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

import StudentLogin from './pages/StudentLogin'
import StudentDashboard from './pages/StudentDashboard'

function App() {

  return (

    <div>

      <Routes>

        {/* ADMIN LOGIN */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* STUDENT LOGIN */}
        <Route
          path="/student-login"
          element={<StudentLogin />}
        />

        {/* STUDENT DASHBOARD */}
        <Route
          path="/student-dashboard"
          element={<StudentDashboard />}
        />

        {/* DASHBOARD */}
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

        {/* STUDENTS */}
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

        {/* SUBJECTS */}
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

        {/* MARKS */}
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

        {/* RESULTS */}
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

        {/* RANK LIST */}
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

        {/* CGPA */}
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

        {/* UPLOAD */}
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

        {/* PUBLISH RESULTS */}
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

        {/* DEFAULT */}
        <Route
          path="/"
          element={
            <Navigate to="/login" />
          }
        />

      </Routes>

    </div>
  )
}

export default App