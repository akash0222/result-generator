import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import connectDB from './config/db.js'

// ROUTES
import authRoutes from './routes/authRoutes.js'
import facultyRoutes from './routes/facultyRoutes.js'
import studentAuthRoutes from './routes/studentAuthRoutes.js'

import studentRoutes from './routes/studentRoutes.js'
import subjectRoutes from './routes/subjectRoutes.js'
import marksRoutes from './routes/marksRoutes.js'
import resultRoutes from './routes/resultRoutes.js'

import publishRoutes from './routes/publishRoutes.js'
import emailRoutes from './routes/emailRoutes.js'

dotenv.config()

// ======================
// CONNECT DATABASE
// ======================

connectDB()

const app =
  express()

// ======================
// MIDDLEWARE
// ======================

// CORS
app.use(

  cors({

    origin: '*',

    credentials: true
  })
)

// BODY PARSER
app.use(
  express.json()
)

// ======================
// ROUTES
// ======================

// ======================
// AUTH ROUTES
// ======================

// ADMIN AUTH
app.use(
  '/api/auth',
  authRoutes
)

// FACULTY AUTH
app.use(
  '/api/faculty',
  facultyRoutes
)

// STUDENT AUTH
app.use(
  '/api/student-auth',
  studentAuthRoutes
)

// ======================
// MAIN MODULES
// ======================

// STUDENTS
app.use(
  '/api/students',
  studentRoutes
)

// SUBJECTS
app.use(
  '/api/subjects',
  subjectRoutes
)

// MARKS
app.use(
  '/api/marks',
  marksRoutes
)

// RESULTS
app.use(
  '/api/results',
  resultRoutes
)

// PUBLISH
app.use(
  '/api/publish',
  publishRoutes
)

// EMAIL
app.use(
  '/api/email',
  emailRoutes
)

// ======================
// HOME ROUTE
// ======================

app.get('/', (req, res) => {

  res.send(
    'Result Management API Running...'
  )
})

// ======================
// 404 HANDLER
// ======================

app.use((req, res) => {

  res.status(404).json({

    message:
      'API Route Not Found'
  })
})

// ======================
// GLOBAL ERROR HANDLER
// ======================

app.use((err, req, res, next) => {

  console.log(err.stack)

  res.status(500).json({

    message:

      err.message ||

      'Internal Server Error'
  })
})

// ======================
// PORT
// ======================

const PORT =
  process.env.PORT || 5000

// ======================
// START SERVER
// ======================

app.listen(PORT, () => {

  console.log(

    `Server running on port ${PORT}`
  )
})