import SchoolProfile from '../models/SchoolProfile.js'

// GET PROFILE
export const getSchoolProfile = async (req, res) => {

  try {

    const profile =
      await SchoolProfile.findOne()

    res.json(profile || {})

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }

}

// SAVE / UPDATE PROFILE
export const saveSchoolProfile = async (req, res) => {

  try {

    let profile =
      await SchoolProfile.findOne()

    if (profile) {

      profile =
        await SchoolProfile.findByIdAndUpdate(

          profile._id,

          req.body,

          {
            new: true
          }
        )

    } else {

      profile =
        await SchoolProfile.create(
          req.body
        )

    }

    res.json(profile)

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }

}