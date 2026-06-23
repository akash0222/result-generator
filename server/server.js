import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import connectDB from './config/db.js'

// ======================
// ROUTES
// ======================

import authRoutes from './routes/authRoutes.js'
import facultyRoutes from './routes/facultyRoutes.js'
import studentAuthRoutes from './routes/studentAuthRoutes.js'

import studentRoutes from './routes/studentRoutes.js'

import schoolProfileRoutes from './routes/schoolProfileRoutes.js'
import classRoutes from './routes/classRoutes.js'
import academicSessionRoutes from './routes/academicSessionRoutes.js'

// FUTURE MODULES (PHASE 2+)

// import subjectRoutes from './routes/subjectRoutes.js'
// import marksRoutes from './routes/marksRoutes.js'
// import resultRoutes from './routes/resultRoutes.js'
// import publishRoutes from './routes/publishRoutes.js'
// import emailRoutes from './routes/emailRoutes.js'

dotenv.config()

// ======================
// DATABASE
// ======================

connectDB()

const app = express()

// ======================
// MIDDLEWARE
// ======================

app.use(
  cors({
    origin: '*',
    credentials: true,
  })
)

app.use(express.json())

// ======================
// HOME
// ======================

app.get('/', (req, res) => {
  res.send('School ERP API Running...')
})

// ======================
// AUTH
// ======================

app.use('/api/auth', authRoutes)

app.use('/api/faculty', facultyRoutes)

app.use(
  '/api/student-auth',
  studentAuthRoutes
)

// ======================
// CORE SCHOOL ERP
// ======================

// STUDENTS

app.use(
  '/api/students',
  studentRoutes
)

// SCHOOL PROFILE

app.use(
  '/api/school-profile',
  schoolProfileRoutes
)

// CLASSES

app.use(
  '/api/classes',
  classRoutes
)

app.use(
  '/api/academic-sessions',
  academicSessionRoutes
)
// ======================
// FUTURE MODULES
// ======================

// app.use('/api/subjects', subjectRoutes)
// app.use('/api/marks', marksRoutes)
// app.use('/api/results', resultRoutes)
// app.use('/api/publish', publishRoutes)
// app.use('/api/email', emailRoutes)

// ======================
// 404
// ======================

app.use((req, res) => {
  res.status(404).json({
    message: 'API Route Not Found',
  })
})

// ======================
// ERROR HANDLER
// ======================

app.use((err, req, res, next) => {
  console.log(err.stack)

  res.status(500).json({
    message:
      err.message ||
      'Internal Server Error',
  })
})

// ======================
// SERVER
// ======================

const PORT =
  process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(
    `School ERP Server running on port ${PORT}`
  )
})