import jwt from 'jsonwebtoken'

// ======================
// PROTECT ROUTES
// ======================
const protect = (
  req,
  res,
  next
) => {

  try {

    let token = null

    // ======================
    // CHECK AUTH HEADER
    // ======================
    if (

      req.headers.authorization &&

      req.headers.authorization.startsWith(
        'Bearer'
      )

    ) {

      token =
        req.headers.authorization.split(
          ' '
        )[1]
    }

    // ======================
    // TOKEN NOT FOUND
    // ======================
    if (!token) {

      return res.status(401).json({

        success: false,

        message:
          'Not authorized, token missing'
      })
    }

    // ======================
    // VERIFY TOKEN
    // ======================
    const decoded =
      jwt.verify(

        token,

        process.env.JWT_SECRET
      )

    // SAVE USER
    req.user = decoded

    next()

  } catch (error) {

    console.log(
      'AUTH ERROR:',
      error.message
    )

    return res.status(401).json({

      success: false,

      message:
        'Invalid or expired token'
    })
  }
}

// ======================
// ADMIN ONLY
// ======================
const adminOnly = (
  req,
  res,
  next
) => {

  try {

    if (

      !req.user ||

      req.user.role !== 'admin'

    ) {

      return res.status(403).json({

        success: false,

        message:
          'Admin access only'
      })
    }

    next()

  } catch (error) {

    return res.status(500).json({

      success: false,

      message:
        'Authorization failed'
    })
  }
}

// ======================
// FACULTY / ADMIN
// ======================
const facultyOnly = (
  req,
  res,
  next
) => {

  try {

    if (

      !req.user ||

      (
        req.user.role !== 'faculty' &&

        req.user.role !== 'admin'
      )

    ) {

      return res.status(403).json({

        success: false,

        message:
          'Faculty/Admin access only'
      })
    }

    next()

  } catch (error) {

    return res.status(500).json({

      success: false,

      message:
        'Authorization failed'
    })
  }
}

export {

  protect,

  adminOnly,

  facultyOnly
}