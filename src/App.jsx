import { Routes, Route, Navigate } from 'react-router-dom'

import Navbar from './components/Navbar'

import Dashboard from './pages/Dashboard'
import Students from './pages/Students'
import Subjects from './pages/Subjects'
import Marks from './pages/Marks'
import Results from './pages/Results'
import Upload from './pages/Upload'

function App() {

  return (

    <div>

      <Navbar />

      <Routes>

        <Route
  path="/dashboard"
  element={<Dashboard />}
/>

        <Route
          path="/"
          element={<Navigate to="/students" />}
        />

        <Route
          path="/students"
          element={<Students />}
        />

        <Route
          path="/subjects"
          element={<Subjects />}
        />

        <Route
          path="/marks"
          element={<Marks />}
        />

        <Route
          path="/results"
          element={<Results />}
        />

        <Route
  path="/upload"
  element={<Upload />}
/>


      </Routes>

    </div>

  )
}

export default App