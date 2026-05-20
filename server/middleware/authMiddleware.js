import jwt from 'jsonwebtoken'

const protect = (req, res, next) => {

  try {

    let token = null

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1]
    }

    if (!token) {
      return res.status(401).json({
        message: 'Not authorized'
      })
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    )

    req.user = decoded

    next()

  } catch (error) {

    res.status(401).json({
      message: 'Token failed'
    })
  }
}

const adminOnly =
  (req, res, next) => {

    if (
      req.user.role !== 'admin'
    ) {

      return res.status(403).json({
        message: 'Admin only access'
      })
    }

    next()
  }

const facultyOnly =
  (req, res, next) => {

    if (
      req.user.role !== 'faculty'
    ) {

      return res.status(403).json({
        message: 'Faculty only access'
      })
    }

    next()
  }

export {
  protect,
  adminOnly,
  facultyOnly
}
