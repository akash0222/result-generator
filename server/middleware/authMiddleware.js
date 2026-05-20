import jwt from 'jsonwebtoken'

const protect = (req, res, next) => {

  try {

    let token = null

    // CHECK TOKEN
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {

      token =
        req.headers.authorization.split(' ')[1]
    }

    // NO TOKEN
    if (!token) {

      return res.status(401).json({

        message: 'Not authorized'
      })
    }

    // VERIFY TOKEN
    const decoded = jwt.verify(

      token,

      process.env.JWT_SECRET
    )

    req.user = decoded

    next()

  } catch (error) {

    console.log(error)

    res.status(401).json({

      message: 'Token failed'
    })
  }
}

// ======================
// ADMIN ONLY
// ======================
const adminOnly =
  (req, res, next) => {

    if (
      req.user.role !== 'admin'
    ) {

      return res.status(403).json({

        message:
          'Admin only access'
      })
    }

    next()
  }

// ======================
// FACULTY / ADMIN
// ======================
const facultyOnly =
  (req, res, next) => {

    if (

      req.user.role !== 'faculty' &&

      req.user.role !== 'admin'

    ) {

      return res.status(403).json({

        message:
          'Faculty/Admin only access'
      })
    }

    next()
  }

export {

  protect,

  adminOnly,

  facultyOnly
}