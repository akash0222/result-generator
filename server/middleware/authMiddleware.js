import jwt from 'jsonwebtoken'

// VERIFY TOKEN
const protect =
  (req, res, next) => {

    try {

      const token =
        req.headers.authorization

      if (!token) {

        return res.status(401).json({

          message:
            'Not authorized'
        })
      }

      const decoded =
        jwt.verify(

          token,
          'secret123'
        )

      req.user =
        decoded

      next()

    } catch (error) {

      res.status(401).json({

        message:
          'Token failed'
      })
    }
  }

// ADMIN ONLY
const adminOnly =
  (req, res, next) => {

    if (
      req.user.role !==
      'admin'
    ) {

      return res.status(403).json({

        message:
          'Admin only access'
      })
    }

    next()
  }

// FACULTY ONLY
const facultyOnly =
  (req, res, next) => {

    if (
      req.user.role !==
      'faculty'
    ) {

      return res.status(403).json({

        message:
          'Faculty only access'
      })
    }

    next()
  }

export {

  protect,
  adminOnly,
  facultyOnly
}