import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import connectDB from './config/db.js'

import studentRoutes from './routes/studentRoutes.js'
import marksRoutes from './routes/marksRoutes.js'
import resultRoutes from './routes/resultRoutes.js'
import subjectRoutes from './routes/subjectRoutes.js'
import publishRoutes from './routes/publishRoutes.js'
import emailRoutes from './routes/emailRoutes.js'
import facultyRoutes from './routes/facultyRoutes.js'
import authRoutes from './routes/authRoutes.js'

dotenv.config()

// CONNECT DATABASE
connectDB()

const app = express()

// ======================
// CORS
// ======================
app.use(

  cors({

    origin: '*',

    credentials: true
  })
)

// ======================
// BODY PARSER
// ======================
app.use(express.json())

// ======================
// ROUTES
// ======================

// AUTH
app.use(
  '/api/auth',
  authRoutes
)

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

// PUBLISH RESULTS
app.use(
  '/api/publish',
  publishRoutes
)

// EMAIL
app.use(
  '/api/email',
  emailRoutes
)

// FACULTY
app.use(
  '/api/faculty',
  facultyRoutes
)

// ======================
// TEST ROUTE
// ======================
app.get('/', (req, res) => {

  res.send('API Running...')
})

// ======================
// ERROR HANDLER
// ======================
app.use((err, req, res, next) => {

  console.log(err.stack)

  res.status(500).json({

    message:
      err.message ||
      'Server Error'
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