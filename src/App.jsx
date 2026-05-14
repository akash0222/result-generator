import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Students from './pages/Students'
import Results from './pages/Results'
import Upload from './pages/Upload'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/students" element={<Students />} />
      <Route path="/results" element={<Results />} />
      <Route path="/upload" element={<Upload />} />
    </Routes>
  )
}

export default App